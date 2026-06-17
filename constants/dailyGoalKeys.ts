export const dailyGoalKeys = {
  all: ["DailyGoal"] as const,
  lists: () => [...dailyGoalKeys.all, "list"] as const,
  list: (filters: any) => [...dailyGoalKeys.lists(), filters] as const,
  details: () => [...dailyGoalKeys.all, "detail"] as const,
  detail: (id: string | number) => [...dailyGoalKeys.details(), id] as const,
};
