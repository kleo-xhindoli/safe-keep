import React from "react";
import cn from "classnames";
import Icon from "./Icon";

type AlertType = "info" | "warning" | "error" | "success";

const getIconName = (type: AlertType) => {
  switch (type) {
    case "info":
      return "InformationCircle";
    case "warning":
      return "Exclamation";
    case "error":
      return "XCircle";
    case "success":
      return "CheckCircle";
  }
};

interface AlertProps {
  type: AlertType;
  title?: string;
  content?: string;
}

const Alert: React.FC<AlertProps> = ({ type, title, content }) => {
  const iconName = getIconName(type);
  return (
    <div
      className={cn("rounded-md p-4 mb-4", {
        "bg-red-50": type === "error",
        "bg-yellow-50": type === "warning",
        "bg-blue-50": type === "info",
        "bg-green-50": type === "success",
      })}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon
            name={iconName}
            className={cn("h-5 w-5", {
              "text-red-400": type === "error",
              "text-yellow-400": type === "warning",
              "text-blue-400": type === "info",
              "text-green-400": type === "success",
            })}
          />
        </div>

        <div className="ml-3">
          {title && (
            <h3
              className={cn("text-sm leading-5 font-medium", {
                "text-red-800": type === "error",
                "text-yellow-800": type === "warning",
                "text-blue-800": type === "info",
                "text-green-800": type === "success",
              })}
            >
              {title}
            </h3>
          )}

          {content && (
            <div
              className={cn("mt-2 text-sm leading-5", {
                "text-red-700": type === "error",
                "text-yellow-700": type === "warning",
                "text-blue-700": type === "info",
                "text-green-700": type === "success",
              })}
            >
              <p>{content}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Alert;
