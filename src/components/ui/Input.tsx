import React, { HTMLProps } from "react";
import cn from "classnames";
import { Assign } from "../../types/utils";

export type InputProps = Assign<
  HTMLProps<HTMLInputElement>,
  {
    className?: string;
    leftElement?: React.ReactNode;
    rightElement?: React.ReactNode;
    hasError?: boolean;
  }
>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, leftElement, rightElement, hasError = false, ...rest },
    ref
  ) => {
    const baseStyles = cn(
      "shadow-sm block w-full sm:text-sm rounded-md border-1",
      {
        "pl-10": leftElement,
      }
    );
    const idleStyles =
      "focus:ring-indigo-500 focus:border-indigo-500 border-gray-300";
    const errorStyles =
      "border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500";

    const wrapperStyles = cn("rounded-md shadow-sm relative", className);
    return (
      <div className={wrapperStyles}>
        {leftElement && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {leftElement}
          </div>
        )}
        <input
          ref={ref}
          {...rest}
          className={cn(baseStyles, hasError ? errorStyles : idleStyles)}
        />
        {rightElement && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {rightElement}
          </div>
        )}
      </div>
    );
  }
);

export default Input;
