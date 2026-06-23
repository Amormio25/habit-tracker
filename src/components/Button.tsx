import type { ComponentProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Variant = "primary" | "secondary" | "ghost-destructive";
type ButtonProps = {
  variant?: Variant;
} & ComponentProps<"button">;

export default function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      // tw-merge library needed for this, basically just allows overriding styles with last listed prop having the last possible overriding stuff
      className={twMerge(
        "rounded transition-colors px-2 py-1 disabled:opacity-30 disabled:cursor-not-allowed",
        getVariantStyles(variant),
        className,
      )}
    />
  );
}

function getVariantStyles(variant: Variant) {
  switch (variant) {
    case "primary":
      return "bg-cyan-600 hover: bg-cyan-500";
    case "secondary":
      return "bg-zinc-700 hover: bg-zinc-600 text-zinc-400";
    case "ghost-destructive":
      return "hover:bg-red-800 text-red-800 hover:text-red-200";
    default:
      // means must handle everything
      throw new Error(`Invalid variant: ${variant satisfies never}`);
  }
}
// import type { ComponentProps, ReactNode } from "react";

// type ButtonProps = {
//   children: ReactNode;
// } & ComponentProps<"button">;
// // so our Button accepts every native button prop (onClick, type, disabled, etc.) without listing each one by hand in type ButtonProps

//<button {...props} />
// is the same as:
// <button disabled onClick={save}>Save</button>
// <button disabled> and <button>{children}</button> look different in JSX, but React treats both as props. Spreading {...props} passes disabled, onClick, and children all at once.

// // export default function Button({ children, ...props }: ButtonProps) {
//   return (
//     <button
//       disabled={disabled}
//       className="bg-cyan-600 hover:bg-cyan-500 rounded transition-colors px-2 py-1 disabled:opacity-30 disabled:cursor-not-allowed"
//     >
//       {children}
//     </button>
//   );
// }
