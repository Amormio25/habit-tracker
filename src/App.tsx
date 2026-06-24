import Header from "./components/Header";
import HabitForm from "./components/HabitForm";
import HabitList, { type Habit } from "./components/HabitList";
import { useState } from "react";

export default function App() {
  const [habits, setHabits] = useState<Habit[]>([]);

  function addHabit(name: string) {
    setHabits([...habits, { id: crypto.randomUUID(), name }]);
  }

  function deleteHabit(id: string) {
    setHabits((habits) => habits.filter((habit) => habit.id != id));
  }

  return (
    <div className="max-w-2xl mx-auto p-4 flex flex-col gap-4">
      <Header />
      <HabitForm addHabit={addHabit} />
      <HabitList deleteHabit={deleteHabit} habits={habits} />
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
