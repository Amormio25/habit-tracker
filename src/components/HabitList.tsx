import Button from "./Button";
import { format, isFuture, isSameDay, subDays } from "date-fns";
import useHabits, { type Habit } from "../context/useHabits";

type HabitListProps = {
  visibleDates: Date[];
};

export default function HabitList({ visibleDates }: HabitListProps) {
  const { habits } = useHabits();

  // default display
  if (habits.length === 0) {
    return (
      <p className="text-center text-zinc-500 py-12">
        No habits yet. Add one above to get started!
      </p>
    );
  }
  return (
    <div className="flex flex-col gap-3">
      {habits.map((habit) => (
        <HabitItem key={habit.id} habit={habit} visibleDates={visibleDates} />
      ))}
    </div>
  );

  type HabitItemProps = {
    habit: Habit;
    visibleDates: Date[];
  };

  function HabitItem({ habit, visibleDates }: HabitItemProps) {
    const { deleteHabit, toggleHabit } = useHabits();
    const streak = getStreak(habit.completions);

    return (
      <div className="flex flex-col p-4 gap-3 rounded-xl bg-zinc-800 ">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-medium">{habit.name}</span>
            {streak !== 0 && (
              <span className="text-sm text-amber-400">🔥 {streak}</span>
            )}
          </div>
          <Button
            onClick={() => deleteHabit(habit.id)}
            variant="ghost-destructive"
            className="text-xs"
          >
            Delete
          </Button>
        </div>

        <div className="flex gap-1.5">
          {visibleDates.map((date) => (
            // before classname, buttons don't take up entire space
            <Button
              className="flex flex-1 flex-col items-center gap-0.5 rounded-lg text-xs"
              key={date.toISOString()}
              onClick={() => toggleHabit(habit.id, date)}
              disabled={isFuture(date)}
              variant={
                habit.completions.some((d) => isSameDay(d, date))
                  ? "primary"
                  : "secondary"
              }
            >
              <span className="font-medium">{format(date, "EEE")}</span>
              <span className="font-medium">{format(date, "d")}</span>
            </Button>
          ))}
        </div>
      </div>
    );
  }

  function getStreak(completions: Date[]) {
    let streak = 0;
    let date = new Date();
    // recall future days are disabled, so we start on current day and go backwards

    while (completions.some((d) => isSameDay(d, date))) {
      streak++;
      date = subDays(date, 1);
    }

    return streak;
  }
}
