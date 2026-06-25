import { type ReactNode } from "react";
import { HabitContext, type Habit } from "./useHabits";
import { isSameDay } from "date-fns";
import useLocalStorage from "../hooks/useLocalStorage";

type HabitProviderProps = {
  children: ReactNode;
};

export default function HabitProvider({ children }: HabitProviderProps) {
  const [habits, setHabits] = useLocalStorage<Habit[]>("habits", []);

  function addHabit(name: string) {
    setHabits([...habits, { id: crypto.randomUUID(), name, completions: [] }]);
  }

  function deleteHabit(id: string) {
    setHabits((habits) => habits.filter((habit) => habit.id != id));
  }

  function toggleHabit(id: string, date: Date) {
    // set habits arr
    // given some id and date, the habit should be marked as complete on that date
    // we've done adding and deleting, now we use map to update
    setHabits((habits) =>
      habits.map((habit) => {
        // get the habit we toggled the date for
        if (habit.id !== id) return habit;

        // check if the toggled date is already done
        const isDone = habit.completions.some((d) => isSameDay(d, date));

        // adjust completions array for that habit
        const completions = isDone
          ? habit.completions.filter((d) => !isSameDay(d, date))
          : [...habit.completions, date];

        // immutable so return new object replacing completions array
        return { ...habit, completions };
      }),
    );
  }

  // all content wrapped inside HabitContext has access to these values so no longer need to pass those done
  return (
    <HabitContext value={{ habits, addHabit, deleteHabit, toggleHabit }}>
      {children}
    </HabitContext>
  );
}
