import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "font-inter text-base font-normal text-[#6C7275] outline-none placeholder:text-[#6C7275] placeholder:opacity-100 focus:text-[#141718]",
  {
    variants: {
      intent: {
        primary: "rounded-md px-4 py-2",
        secondary: "pb-1.5 ",
      },
    },
    defaultVariants: {
      intent: "primary",
    },
  }
);

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
  VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ intent, label, error, className, ...props }, ref) => {
    const hasError = !!error;

    return (
      <div className="space-y-1 w-full">
        {label && (
          <label
            htmlFor={props.name}
            className="text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}

        <input
          id={props.name}
          ref={ref}
          {...props}
          className={cn(
            inputVariants({ intent }),
            hasError && "border-red-500 focus:border-red-500",
            className
          )}
        />

        {hasError && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
