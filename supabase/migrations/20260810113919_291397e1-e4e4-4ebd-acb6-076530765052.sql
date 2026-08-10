-- ROLES ---------------------------------------------------------------
CREATE TYPE public.app_role AS ENUM ('admin', 'parent');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users read own roles" ON public.user_roles
FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

-- shared updated_at trigger fn
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- PROFILES ------------------------------------------------------------
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  email text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own profile select" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Own profile insert" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "Own profile update" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "Own profile delete" ON public.profiles FOR DELETE TO authenticated USING (auth.uid() = id);
CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'), NEW.email)
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'parent')
  ON CONFLICT (user_id, role) DO NOTHING;
  RETURN NEW;
END; $$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- CHILDREN ------------------------------------------------------------
CREATE TABLE public.children (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  nickname text NOT NULL,
  age_group text NOT NULL,
  avatar text NOT NULL DEFAULT '🦊',
  preferences jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.children TO authenticated;
GRANT ALL ON public.children TO service_role;
ALTER TABLE public.children ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Parents manage own children" ON public.children
FOR ALL TO authenticated USING (auth.uid() = parent_id) WITH CHECK (auth.uid() = parent_id);
CREATE TRIGGER children_updated_at BEFORE UPDATE ON public.children
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE FUNCTION public.owns_child(_child_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.children c WHERE c.id = _child_id AND c.parent_id = auth.uid())
$$;

-- CONSENT -------------------------------------------------------------
CREATE TABLE public.parental_consents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  child_id uuid REFERENCES public.children(id) ON DELETE CASCADE,
  consent_type text NOT NULL,
  agreed boolean NOT NULL DEFAULT true,
  agreed_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.parental_consents TO authenticated;
GRANT ALL ON public.parental_consents TO service_role;
ALTER TABLE public.parental_consents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Parents read own consents" ON public.parental_consents
FOR SELECT TO authenticated USING (auth.uid() = parent_id);
CREATE POLICY "Parents record own consents" ON public.parental_consents
FOR INSERT TO authenticated WITH CHECK (auth.uid() = parent_id);

-- ACTIVITY LOGS -------------------------------------------------------
CREATE TABLE public.activity_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id uuid NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
  activity_key text NOT NULL,
  activity_type text NOT NULL,
  score integer,
  duration_seconds integer,
  completed_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, DELETE ON public.activity_logs TO authenticated;
GRANT ALL ON public.activity_logs TO service_role;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own child activity select" ON public.activity_logs
FOR SELECT TO authenticated USING (public.owns_child(child_id));
CREATE POLICY "Own child activity insert" ON public.activity_logs
FOR INSERT TO authenticated WITH CHECK (public.owns_child(child_id));
CREATE POLICY "Own child activity delete" ON public.activity_logs
FOR DELETE TO authenticated USING (public.owns_child(child_id));

-- MOOD CHECK-INS ------------------------------------------------------
CREATE TABLE public.mood_checkins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id uuid NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
  mood text NOT NULL,
  note text,
  checked_in_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, DELETE ON public.mood_checkins TO authenticated;
GRANT ALL ON public.mood_checkins TO service_role;
ALTER TABLE public.mood_checkins ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own child mood select" ON public.mood_checkins
FOR SELECT TO authenticated USING (public.owns_child(child_id));
CREATE POLICY "Own child mood insert" ON public.mood_checkins
FOR INSERT TO authenticated WITH CHECK (public.owns_child(child_id));
CREATE POLICY "Own child mood delete" ON public.mood_checkins
FOR DELETE TO authenticated USING (public.owns_child(child_id));

-- REWARDS -------------------------------------------------------------
CREATE TABLE public.rewards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id uuid NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
  badge_key text NOT NULL,
  label text NOT NULL,
  earned_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (child_id, badge_key)
);
GRANT SELECT, INSERT, DELETE ON public.rewards TO authenticated;
GRANT ALL ON public.rewards TO service_role;
ALTER TABLE public.rewards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own child rewards select" ON public.rewards
FOR SELECT TO authenticated USING (public.owns_child(child_id));
CREATE POLICY "Own child rewards insert" ON public.rewards
FOR INSERT TO authenticated WITH CHECK (public.owns_child(child_id));
CREATE POLICY "Own child rewards delete" ON public.rewards
FOR DELETE TO authenticated USING (public.owns_child(child_id));

-- ROUTINE -------------------------------------------------------------
CREATE TABLE public.routine_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id uuid NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
  title text NOT NULL,
  emoji text NOT NULL DEFAULT '⭐',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.routine_tasks TO authenticated;
GRANT ALL ON public.routine_tasks TO service_role;
ALTER TABLE public.routine_tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own child routine tasks" ON public.routine_tasks
FOR ALL TO authenticated USING (public.owns_child(child_id)) WITH CHECK (public.owns_child(child_id));
CREATE TRIGGER routine_tasks_updated_at BEFORE UPDATE ON public.routine_tasks
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.routine_completions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id uuid NOT NULL REFERENCES public.routine_tasks(id) ON DELETE CASCADE,
  child_id uuid NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
  completed_on date NOT NULL DEFAULT current_date,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (task_id, completed_on)
);
GRANT SELECT, INSERT, DELETE ON public.routine_completions TO authenticated;
GRANT ALL ON public.routine_completions TO service_role;
ALTER TABLE public.routine_completions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own child routine completion select" ON public.routine_completions
FOR SELECT TO authenticated USING (public.owns_child(child_id));
CREATE POLICY "Own child routine completion insert" ON public.routine_completions
FOR INSERT TO authenticated WITH CHECK (public.owns_child(child_id));
CREATE POLICY "Own child routine completion delete" ON public.routine_completions
FOR DELETE TO authenticated USING (public.owns_child(child_id));

-- BOOKINGS ------------------------------------------------------------
CREATE TABLE public.bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  service_name text NOT NULL,
  price_inr integer,
  preferred_date date,
  contact_name text NOT NULL,
  contact_email text NOT NULL,
  contact_phone text,
  notes text,
  status text NOT NULL DEFAULT 'requested',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.bookings TO authenticated;
GRANT ALL ON public.bookings TO service_role;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Parents manage own bookings" ON public.bookings
FOR ALL TO authenticated USING (auth.uid() = parent_id) WITH CHECK (auth.uid() = parent_id);
CREATE POLICY "Admins read bookings" ON public.bookings
FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update bookings" ON public.bookings
FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER bookings_updated_at BEFORE UPDATE ON public.bookings
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();