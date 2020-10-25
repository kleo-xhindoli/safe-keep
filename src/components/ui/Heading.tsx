import React, { HTMLProps } from "react";
import cn from "classnames";
import { Assign } from "../../types/utils";

export type HeadingProps = Assign<
  HTMLProps<HTMLHeadingElement>,
  {
    as?: "h1" | "h2" | "h3" | "h4";
    size?: "xl" | "lg" | "md" | "sm";
    className?: string;
  }
>;

const Heading: React.FC<HeadingProps> = ({
  as = "h1",
  size = "lg",
  className,
  children,
  ...rest
}) => {
  const headingSizes = {
    xl: "text-xl leading-tight font-bold text-cool-gray-900",
    lg: "text-lg leading-6 font-medium text-cool-gray-900",
    md: "text-md leading-6 font-medium text-cool-gray-900",
    sm: "text-sm leading-6 font-medium text-cool-gray-900",
  };
  const styles = cn(headingSizes[size], className);
  const HeadingTag = as;
  return (
    <HeadingTag className={styles} {...rest}>
      {children}
    </HeadingTag>
  );
};

export default Heading;
