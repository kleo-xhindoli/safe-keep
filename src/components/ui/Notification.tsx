import { Transition } from "@headlessui/react";
import React, { useEffect } from "react";
import Icon from "./Icon";
import IconButton from "./IconButton";

export enum NotificationType {
  Success = "success",
  Error = "error",
  Info = "info",
  Warning = "warning",
}

const iconNameMap = {
  success: "CheckCircle",
  error: "XCircle",
  info: "InformationCircle",
  warning: "Exclamation",
} as const;

const iconColorMap = {
  success: "text-green-400",
  error: "text-red-400",
  info: "text-indigo-400",
  warning: "text-yellow-400",
};

export interface NotificationProps {
  isVisible: boolean;
  onDismiss: () => void;
  title: string;
  subtitle?: string;
  type?: NotificationType;
  duration?: number;
}

const Notification: React.FC<NotificationProps> = ({
  isVisible,
  title,
  subtitle,
  onDismiss,
  duration = 3000,
  type = NotificationType.Info,
}) => {
  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;
    if (isVisible) {
      timeout = setTimeout(() => {
        onDismiss();
      }, duration);
    }

    return () => {
      timeout && clearTimeout(timeout);
    };
  }, [isVisible, duration, onDismiss]);

  return (
    <div className="fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end z-50">
      <Transition
        show={isVisible}
        enter="transform ease-out duration-300 transition"
        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto"
      >
        <div className="rounded-lg shadow-xs overflow-hidden">
          <div className="p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Icon
                  className={`h-5 w-5 ${iconColorMap[type]}`}
                  name={iconNameMap[type]}
                />
              </div>
              <div className="ml-3 w-0 flex-1 pt-0.5">
                <p className="text-sm leading-5 font-medium text-gray-900">
                  {title}
                </p>
                {subtitle && (
                  <p className="mt-1 text-sm leading-5 text-gray-500">
                    {subtitle}
                  </p>
                )}
              </div>
              <div className="ml-4 flex-shrink-0 flex">
                <IconButton icon="X" onClick={onDismiss} />
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default Notification;
