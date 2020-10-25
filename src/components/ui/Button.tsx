import React, { HTMLProps } from "react";
import cn from "classnames";
import Icon from "./Icon";
import Loader from "./Loader";
import { Assign } from "../../types/utils";
import { IconName } from "../../utils/icons";

type ButtonProps = Assign<
  HTMLProps<HTMLButtonElement>,
  {
    variant?: "primary" | "secondary" | "danger" | "outline";
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    leftIcon?: IconName;
    rightIcon?: IconName;
    className?: string;
    iconClassName?: string;
    type?: "button" | "submit";
    isLoading?: boolean;
    loadingText?: string;
  }
>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      as = "button",
      variant = "outline",
      size = "md",
      leftIcon,
      rightIcon,
      className,
      iconClassName,
      isLoading = false,
      loadingText = "",
      disabled,
      children,
      type = "button",
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;
    const baseStyles =
      "w-full flex items-center justify-center min-w-24 text-center border font-medium rounded-md focus:outline-none transition ease-in-out duration-150";

    const sizes = {
      xs: "px-2.5 py-1.5 text-xs leading-4",
      sm: "px-3 py-2 text-sm leading-4",
      md: "px-4 py-2 text-sm leading-5",
      lg: "px-4 py-2 text-base leading-6",
      xl: "px-6 py-3 text-base leading-6",
    };

    const variants = {
      primary:
        "border-transparent text-white bg-gray-900 hover:bg-gray-800 active:bg-black focus:border-gray-200 focus:shadow-outline-gray",
      danger:
        "border-transparent text-white bg-red-600 hover:bg-red-500 active:bg-red-700 focus:border-red-700 focus:shadow-outline-red",
      secondary:
        "border-transparent text-indigo-700 bg-indigo-100 hover:bg-indigo-50 active:bg-indigo-200 focus:border-indigo-300 focus:shadow-outline-indigo",
      outline:
        "border-gray-300 text-gray-700 bg-white hover:text-gray-500 active:text-gray-800 active:bg-gray-5 focus:border-indigo-300 focus:shadow-outline-indigo",
    };

    const leftIconSizes = {
      xs: "-ml-0.5 mr-2 h-4 w-4",
      sm: "-ml-0.5 mr-2 h-4 w-4",
      md: "-ml-1 mr-2 h-5 w-5",
      lg: "-ml-1 mr-3 h-5 w-5",
      xl: "-ml-1 mr-3 h-5 w-5",
    };

    const rightIconSizes = {
      xs: "ml-2 -mr-0.5 h-4 w-4",
      sm: "ml-2 -mr-0.5 h-4 w-4",
      md: "ml-2 -mr-1 h-5 w-5",
      lg: "ml-3 -mr-1 h-5 w-5",
      xl: "ml-3 -mr-1 h-5 w-5",
    };

    const btnStyles = cn(baseStyles, sizes[size], variants[variant], {
      "opacity-50 cursor-not-allowed": isDisabled,
    });
    const leftIconStyles = cn(leftIconSizes[size], iconClassName);
    const rightIconStyles = cn(rightIconSizes[size], iconClassName);

    return (
      <span className={cn("inline-flex rounded-md shadow-sm", className)}>
        <button
          disabled={isDisabled}
          type={type}
          {...rest}
          className={btnStyles}
          ref={ref}
        >
          {isLoading ? (
            <Loader
              color={
                variant === "primary" || variant === "danger"
                  ? "white"
                  : "gray-400"
              }
              className={cn("-ml-1 h-5 w-5", { "mr-3": !!loadingText })}
            />
          ) : (
            leftIcon && <Icon name={leftIcon} className={leftIconStyles} />
          )}
          {isLoading ? loadingText : children}
          {rightIcon && <Icon name={rightIcon} className={rightIconStyles} />}
        </button>
      </span>
    );
  }
);

export default Button;
