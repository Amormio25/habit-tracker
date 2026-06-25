import { useContext, createContext } from "react";

export type Habit = {
  id: string;
  name: string;
  completions: Date[];
};

type Context = {
  habits: Habit[];
  addHabit: (name: string) => void;
  deleteHabit: (id: string) => void;
  toggleHabit: (id: string, date: Date) => void;
};

export const HabitContext = createContext<Context | null>(null);

export default function useHabits() {
  const habitContext = useContext(HabitContext);

  // using useHabit() outside provider wrapper will error
  if (habitContext == null) throw new Error("Null context.");

  return habitContext;
}
