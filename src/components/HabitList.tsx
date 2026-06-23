import Button from "./Button";
import {
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isFuture,
} from "date-fns";

export default function HabitList() {
  const habits = [{ id: "asdlfa;j", name: "hi" }];

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
        <HabitItem key={habit.id} habit={habit} />
      ))}
    </div>
  );

  type HabitItemProps = {
    habit: { id: string; name: string };
  };

  function HabitItem({ habit }: HabitItemProps) {
    const visibleDates = eachDayOfInterval({
      start: startOfWeek(new Date()),
      end: endOfWeek(new Date()),
    });

    return (
      <div className="flex flex-col p-4 gap-3 rounded-xl bg-zinc-800 ">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-medium">{habit.name}</span>
            <span className="text-sm text-amber-400">🔥 3</span>
          </div>
          <Button variant="ghost-destructive">Delete</Button>
        </div>

        <div className="flex gap-1.5">
          {visibleDates.map((date) => (
            <Button key={date.toISOString()} disabled={isFuture(date)}>
              <span className="font-medium">{format(date, "EEE")}</span>
              <span className="font-medium">{format(date, "d")}</span>
            </Button>
          ))}
        </div>
      </div>
    );
  }
}
