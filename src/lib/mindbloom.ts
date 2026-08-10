import { supabase } from "@/integrations/supabase/client";

export type Child = {
  id: string;
  parent_id: string;
  nickname: string;
  age_group: string;
  avatar: string;
  preferences: string[];
  created_at: string;
};

export const AGE_GROUPS = ["4-6 years", "7-9 years", "10-12 years", "13+ years"] as const;
export const AVATARS = ["🦊", "🐨", "🦁", "🐼", "🐢", "🦄", "🐙", "🐝"] as const;
export const PREFERENCES = [
  "Focus games",
  "Memory games",
  "Breathing & calm",
  "Mood check-ins",
  "Daily routine",
  "Learning activities",
] as const;

export const MOODS = [
  { key: "great", emoji: "😄", label: "Great" },
  { key: "good", emoji: "🙂", label: "Good" },
  { key: "okay", emoji: "😐", label: "Okay" },
  { key: "sad", emoji: "😔", label: "Sad" },
  { key: "angry", emoji: "😠", label: "Frustrated" },
  { key: "worried", emoji: "😟", label: "Worried" },
] as const;

export const DEFAULT_ROUTINE = [
  { title: "Morning stretch", emoji: "🌞" },
  { title: "Pack my bag", emoji: "🎒" },
  { title: "Homework chunk", emoji: "📚" },
  { title: "Calm breathing", emoji: "🌬️" },
  { title: "Tidy my space", emoji: "🧺" },
  { title: "Bedtime wind-down", emoji: "🌙" },
];

export const BADGES: Record<string, string> = {
  first_activity: "First Step 🌱",
  focus_star: "Focus Star ⭐",
  memory_master: "Memory Master 🧠",
  calm_breather: "Calm Breather 🌬️",
  mood_explorer: "Mood Explorer 💛",
  routine_hero: "Routine Hero 🏅",
};

function toStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];
}

export async function listChildren(): Promise<Child[]> {
  const { data, error } = await supabase
    .from("children")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data ?? []).map((row) => ({
    id: row.id,
    parent_id: row.parent_id,
    nickname: row.nickname,
    age_group: row.age_group,
    avatar: row.avatar,
    preferences: toStringArray(row.preferences),
    created_at: row.created_at,
  }));
}

export async function logActivity(input: {
  childId: string;
  activityKey: string;
  activityType: string;
  score?: number;
  durationSeconds?: number;
}) {
  const { error } = await supabase.from("activity_logs").insert({
    child_id: input.childId,
    activity_key: input.activityKey,
    activity_type: input.activityType,
    score: input.score ?? null,
    duration_seconds: input.durationSeconds ?? null,
  });
  if (error) throw error;
}

export async function awardBadge(childId: string, badgeKey: string) {
  const label = BADGES[badgeKey] ?? badgeKey;
  await supabase
    .from("rewards")
    .upsert({ child_id: childId, badge_key: badgeKey, label }, { onConflict: "child_id,badge_key" });
}

export async function createChild(input: {
  parentId: string;
  nickname: string;
  ageGroup: string;
  avatar: string;
  preferences: string[];
}): Promise<Child> {
  const { data, error } = await supabase
    .from("children")
    .insert({
      parent_id: input.parentId,
      nickname: input.nickname,
      age_group: input.ageGroup,
      avatar: input.avatar,
      preferences: input.preferences,
    })
    .select("*")
    .single();
  if (error) throw error;

  await supabase.from("parental_consents").insert({
    parent_id: input.parentId,
    child_id: data.id,
    consent_type: "child_profile",
    agreed: true,
  });

  await supabase.from("routine_tasks").insert(
    DEFAULT_ROUTINE.map((task, i) => ({
      child_id: data.id,
      title: task.title,
      emoji: task.emoji,
      sort_order: i,
    })),
  );

  return {
    id: data.id,
    parent_id: data.parent_id,
    nickname: data.nickname,
    age_group: data.age_group,
    avatar: data.avatar,
    preferences: toStringArray(data.preferences),
    created_at: data.created_at,
  };
}

export async function deleteChild(childId: string) {
  const { error } = await supabase.from("children").delete().eq("id", childId);
  if (error) throw error;
}

export type ChildProgress = {
  activities: number;
  minutes: number;
  badges: { badge_key: string; label: string }[];
  moods: { mood: string; checked_in_at: string }[];
  routineDoneToday: number;
  routineTotal: number;
};

export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export async function getChildProgress(childId: string): Promise<ChildProgress> {
  const [logs, rewards, moods, tasks, completions] = await Promise.all([
    supabase.from("activity_logs").select("duration_seconds").eq("child_id", childId),
    supabase.from("rewards").select("badge_key, label").eq("child_id", childId),
    supabase
      .from("mood_checkins")
      .select("mood, checked_in_at")
      .eq("child_id", childId)
      .order("checked_in_at", { ascending: false })
      .limit(7),
    supabase.from("routine_tasks").select("id").eq("child_id", childId),
    supabase
      .from("routine_completions")
      .select("id")
      .eq("child_id", childId)
      .eq("completed_on", todayISO()),
  ]);

  const seconds = (logs.data ?? []).reduce((sum, r) => sum + (r.duration_seconds ?? 0), 0);
  return {
    activities: logs.data?.length ?? 0,
    minutes: Math.round(seconds / 60),
    badges: rewards.data ?? [],
    moods: moods.data ?? [],
    routineDoneToday: completions.data?.length ?? 0,
    routineTotal: tasks.data?.length ?? 0,
  };
}

export type RoutineTask = { id: string; title: string; emoji: string; sort_order: number };

export async function listRoutine(childId: string) {
  const [tasks, done] = await Promise.all([
    supabase
      .from("routine_tasks")
      .select("id, title, emoji, sort_order")
      .eq("child_id", childId)
      .order("sort_order"),
    supabase
      .from("routine_completions")
      .select("task_id")
      .eq("child_id", childId)
      .eq("completed_on", todayISO()),
  ]);
  return {
    tasks: (tasks.data ?? []) as RoutineTask[],
    doneIds: new Set((done.data ?? []).map((d) => d.task_id)),
  };
}

export async function toggleRoutineTask(childId: string, taskId: string, done: boolean) {
  if (done) {
    const { error } = await supabase
      .from("routine_completions")
      .delete()
      .eq("child_id", childId)
      .eq("task_id", taskId)
      .eq("completed_on", todayISO());
    if (error) throw error;
  } else {
    const { error } = await supabase
      .from("routine_completions")
      .insert({ child_id: childId, task_id: taskId, completed_on: todayISO() });
    if (error) throw error;
  }
}

export async function saveMood(childId: string, mood: string) {
  const { error } = await supabase.from("mood_checkins").insert({ child_id: childId, mood });
  if (error) throw error;
  await awardBadge(childId, "mood_explorer");
}