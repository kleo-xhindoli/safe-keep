import React, { HTMLProps } from "react";
import cn from "classnames";
import Icon from "./Icon";
import { Assign } from "../../types/utils";
import { IconName } from "../../utils/icons";

type IconButtonProps = Assign<
  HTMLProps<HTMLButtonElement>,
  {
    icon: IconName;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    className?: string;
    type?: "button" | "submit";
  }
>;

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, size = "md", className, disabled, children, ...rest }, ref) => {
    const isDisabled = !!disabled;
    const baseStyles =
      "w-8 h-8 flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:text-gray-500 focus:bg-gray-100 transition ease-in-out duration-150";

    const sizes = {
      xs: "h-5 w-5",
      sm: "h-6 w-6",
      md: "h-8 w-8",
      lg: "h-10 w-10",
      xl: "h-12 w-12",
    };

    const iconSizes = {
      xs: "h-3 w-3",
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
      xl: "h-8 w-8",
    };

    const btnStyles = cn(
      baseStyles,
      sizes[size],
      {
        "opacity-50 cursor-not-allowed": isDisabled,
      },
      className
    );

    return (
      <button disabled={isDisabled} {...rest} className={btnStyles} ref={ref}>
        <Icon name={icon} className={iconSizes[size]} />
      </button>
    );
  }
);

export default IconButton;
