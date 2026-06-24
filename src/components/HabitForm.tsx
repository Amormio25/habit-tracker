import Button from "./Button";
import { useState, type SubmitEvent } from "react";

type HabitFormProps = {
  addHabit: (name: string) => void;
};

export default function HabitForm({ addHabit }: HabitFormProps) {
  const [name, setName] = useState("");

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    if (name.trim() === "") return;
    setName("");
    addHabit(name);

    console.log(name);
  }

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        className="flex-1 rounded-lg bg-zinc-800 px-4 py-2 outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
        placeholder="New habit..."
      />
      <Button
        disabled={name.trim() === ""}
        className="rounded-lg px-4 py-2 font-medium"
      >
        Add Habit
      </Button>
    </form>
  );
}
