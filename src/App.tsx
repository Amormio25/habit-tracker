import Header from "./components/Header";
import HabitForm from "./components/HabitForm";
import HabitList, { type Habit } from "./components/HabitList";
import { useState } from "react";
import { isSameDay } from "date-fns";

export default function App() {
  const [habits, setHabits] = useState<Habit[]>([]);

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

  return (
    <div className="max-w-2xl mx-auto p-4 flex flex-col gap-4">
      <Header />
      <HabitForm addHabit={addHabit} />
      <HabitList
        deleteHabit={deleteHabit}
        toggleHabit={toggleHabit}
        habits={habits}
      />
    </div>
  );
}

// The problem: HabitForm and HabitList are siblings. Siblings can’t share state directly.

// The fix: Put the shared data in the parent (App):

// habits state lives in App
// addHabit updates that state in App
// HabitForm gets addHabit and calls it on submit
// HabitList gets habits and displays them
// When addHabit eventually does setHabits(...), App re-renders and passes the new habits to HabitList, so the list updates.
