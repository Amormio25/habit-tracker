import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
};

export default function Button({ children }: ButtonProps) {
  return (
    <button
      disabled
      className="bg-cyan-600 hover:bg-cyan-500 rounded transition-colors px-2 py-1 disabled:opacity-30 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
}
