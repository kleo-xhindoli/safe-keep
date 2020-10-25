import React from "react";
import icons, { IconName } from "../../utils/icons";

interface IconProps {
  name: IconName;
  className?: string;
  strokeWidth?: string;
}

const Icon: React.FC<IconProps> = ({ name, ...rest }) => {
  const IconElement = icons[name];

  return React.cloneElement(IconElement, rest);
};

export default Icon;
