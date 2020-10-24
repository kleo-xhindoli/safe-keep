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
      "form-input block w-full py-2 px-3 border rounded-md shadow-sm focus:outline-none transition duration-150 ease-in-out sm:text-sm sm:leading-5",
      { "pl-10": leftElement }
    );
    const idleStyles =
      "border-gray-300 focus:shadow-outline-indigo focus:border-indigo-300";
    const errorStyles =
      "border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red";

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
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {rightElement}
          </div>
        )}
      </div>
    );
  }
);

export default Input;
