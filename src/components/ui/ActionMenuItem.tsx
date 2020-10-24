import React from "react";
import { Menu } from "@headlessui/react";
import cn from "classnames";
import Icon from "./Icon";

interface ActionMenuItemProps {
  as?: "a" | "button" | "div";
  leftIcon?: string;
  iconClassName?: string;
  className?: string;
  onClick?: (e: React.MouseEvent) => any;
  href?: string;
  download?: string;
}

const ActionMenuItem: React.FC<ActionMenuItemProps> = ({
  as = "a",
  leftIcon,
  iconClassName,
  className,
  onClick,
  children,
  ...rest
}) => {
  const Tag = as;

  return (
    <Menu.Item>
      {({ active }) => (
        <Tag
          className={cn(
            "group w-full flex items-center px-4 py-2 text-sm leading-5 text-gray-700 focus:outline-none focus:bg-gray-100 focus:text-gray-900 cursor-pointer",
            { "bg-gray-100 text-gray-900": active },
            className
          )}
          role="menuitem"
          {...rest}
        >
          {leftIcon && (
            <Icon
              name={leftIcon}
              className={cn(
                "mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500",
                iconClassName
              )}
            />
          )}
          {children}
        </Tag>
      )}
    </Menu.Item>
  );
};

export default ActionMenuItem;
