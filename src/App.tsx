import Header from "./components/Header";
import HabitForm from "./components/HabitForm";
import HabitList from "./components/HabitList";
import HabitProvider from "./context/HabitProvider";
import { startOfWeek, endOfWeek, addWeeks, eachDayOfInterval } from "date-fns";
import { useState } from "react";

export default function App() {
  const [weekOffset, setWeekOffset] = useState(0);

  const week = addWeeks(new Date(), weekOffset);
  const visibleDates = eachDayOfInterval({
    start: startOfWeek(week),
    end: endOfWeek(week),
  });

  return (
    <div className="max-w-2xl mx-auto p-4 flex flex-col gap-4">
      <HabitProvider>
        <Header
          visibleDates={visibleDates}
          onPrev={() => setWeekOffset((offset) => offset - 1)}
          onNext={() => setWeekOffset((offset) => offset + 1)}
        />
        <HabitForm />
        <HabitList visibleDates={visibleDates} />
      </HabitProvider>
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
