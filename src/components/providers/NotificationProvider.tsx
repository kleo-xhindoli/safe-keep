import React, { useState } from "react";
import { useDisclosure } from "../../hooks/utils";
import Notification, { NotificationType } from "../ui/Notification";

export type NotificationOptions = {
  title: string;
  subtitle?: string;
  duration?: number;
  type: NotificationType;
};

type NotificationContextValue = {
  showNotification: (opts: NotificationOptions) => void;
};

export const NotificationContext = React.createContext<
  NotificationContextValue
>({
  showNotification: () => {},
});

interface NotificationProviderProps {}

const NotificationProvider: React.FC<NotificationProviderProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentOptions, setCurrentOptions] = useState<NotificationOptions>({
    title: "",
    duration: 3000,
    type: NotificationType.Info,
  });
  const showNotification = (opts: NotificationOptions) => {
    setCurrentOptions(currentOptions);
    onOpen();
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      <Notification
        isVisible={isOpen}
        onDismiss={onClose}
        title={currentOptions.title}
        subtitle={currentOptions.subtitle}
        duration={currentOptions.duration}
        type={currentOptions.type}
      />
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
