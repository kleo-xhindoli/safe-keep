import React, { HTMLProps } from "react";
import cn from "classnames";

interface LabelProps extends HTMLProps<HTMLLabelElement> {
  className?: string;
}

const Label: React.FC<LabelProps> = ({ className, ...rest }) => {
  const styles = cn(
    "block text-sm font-medium leading-5 text-gray-700",
    className
  );
  return <label className={styles} {...rest} />;
};

export default Label;
