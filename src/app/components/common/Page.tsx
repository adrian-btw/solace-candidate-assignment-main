import { HTMLAttributes } from "react";

export interface PageProps extends HTMLAttributes<HTMLDivElement> {}

export const Page = ({ className = "", children, ...props }: PageProps) => {
  const classes = [
    // Constrain width and center
    "max-w-5xl mx-auto",
    // Horizontal page padding
    "px-4 sm:px-6 md:px-8",
    // Vertical page padding
    "py-6 sm:py-8 md:py-10",
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
