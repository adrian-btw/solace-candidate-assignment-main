import { HTMLAttributes } from "react";

export interface PanelProps extends HTMLAttributes<HTMLDivElement> {}

export const Panel = ({ className = "", children, ...props }: PanelProps) => {
  const classes = [
    "bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden",
    "p-4 sm:p-6 md:p-8",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};
