import { isToday } from "date-fns";
import useHabits from "../context/useHabits";
import Button from "./Button";
import { format } from "date-fns";

type HeaderProps = {
  visibleDates: Date[];
  onPrev: () => void;
  onNext: () => void;
};

export default function Header({ visibleDates, onPrev, onNext }: HeaderProps) {
  // get # of habits, habits with completions same day today
  const { habits } = useHabits();

  const completedToday = habits.filter((habit) =>
    habit.completions.some((d) => isToday(d)),
  ).length;

  const dateRange = `${format(visibleDates[0], "MMM d")} - ${format(visibleDates[6], "MMM d")}`;

  return (
    <header className="flex justify-between items-center">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold">Habit Tracker</h1>
        <span className="text-sm text-zinc-400">
          {completedToday} / {habits.length} done today
        </span>
      </div>

      <div className="flex flex-col items-end gap-1">
        <span className="text-sm text-zinc-400">{dateRange}</span>
        <div className="flex items-center gap-3">
          <Button onClick={onPrev}>Prev</Button>
          <Button
            onClick={onNext}
            disabled={visibleDates.some((d) => isToday(d))}
          >
            Next
          </Button>
        </div>
      </div>
    </header>
  );
}
