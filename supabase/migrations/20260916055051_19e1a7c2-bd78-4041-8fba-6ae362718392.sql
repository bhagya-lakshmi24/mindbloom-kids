CREATE TABLE public.activity_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL DEFAULT 'activity',
  icon_key text NOT NULL DEFAULT 'sparkles',
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.activity_content TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.activity_content TO authenticated;
GRANT ALL ON public.activity_content TO service_role;
ALTER TABLE public.activity_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active activities" ON public.activity_content FOR SELECT TO anon USING (is_active = true);
CREATE POLICY "Signed-in users can view active activities" ON public.activity_content FOR SELECT TO authenticated USING (is_active = true OR public.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can create activities" ON public.activity_content FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can edit activities" ON public.activity_content FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'::public.app_role)) WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can remove activities" ON public.activity_content FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'::public.app_role));
CREATE TRIGGER activity_content_updated_at BEFORE UPDATE ON public.activity_content FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
INSERT INTO public.activity_content (title, description, category, icon_key, sort_order) VALUES
  ('Attention Games', 'Spot-the-change and sorting challenges in 3-minute rounds.', 'focus', 'brain', 10),
  ('Memory Challenges', 'Card pairs and sequence recall that get harder as skills grow.', 'memory', 'puzzle', 20),
  ('Brain Puzzles', 'Logic and pattern puzzles for a quick, satisfying win.', 'thinking', 'puzzle', 30),
  ('Reward System', 'Stars for effort, not perfection — cash them in for family treats.', 'rewards', 'award', 40),
  ('Color Match', 'A quick Stroop-style challenge for flexible attention.', 'game', 'palette', 50),
  ('Number Memory', 'Remember a growing number sequence and build recall confidence.', 'game', 'sparkles', 60),
  ('Odd One Out', 'Spot the item that does not belong and practise visual reasoning.', 'game', 'search', 70),
  ('Focus Timer', 'Work in one short burst, then take a restorative break.', 'tool', 'timer', 80),
  ('Daily Habit Tracker', 'Keep small routines visible and celebrate consistent effort.', 'tool', 'check', 90),
  ('Calm Breathing', 'Follow a gentle breathing rhythm whenever the day needs a reset.', 'tool', 'wind', 100);