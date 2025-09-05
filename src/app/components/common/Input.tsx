import { forwardRef, InputHTMLAttributes, ReactNode } from "react";

type Size = "sm" | "md" | "lg";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  size?: Size;
  fullWidth?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  error?: string;
}

const sizeClasses: Record<Size, string> = {
  sm: "h-8 text-sm",
  md: "h-10 text-sm",
  lg: "h-11 text-base",
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = "md",
      fullWidth = false,
      leadingIcon,
      trailingIcon,
      className = "",
      error,
      ...props
    },
    ref
  ) => {
    const width = fullWidth ? "w-full" : "";
    const hasLeading = Boolean(leadingIcon);
    const hasTrailing = Boolean(trailingIcon);

    const base = [
      "block rounded-md border bg-white text-gray-900 placeholder-gray-400 shadow-sm",
      "border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600",
      "disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-200",
      sizeClasses[size],
      width,
      hasLeading ? "pl-10" : "px-3",
      hasTrailing ? "pr-10" : hasLeading ? "" : "",
      error ? "border-red-500 focus:ring-red-600 focus:border-red-600" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={width ? width : undefined}>
        <div className="relative">
          {hasLeading ? (
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              {leadingIcon}
            </span>
          ) : null}
          <input ref={ref} className={base} {...props} />
          {hasTrailing ? (
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
              {trailingIcon}
            </span>
          ) : null}
        </div>
        {error ? (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
