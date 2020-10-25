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

const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentOptions, setCurrentOptions] = useState<
    NotificationOptions & { id: string }
  >({
    id: "0",
    title: "",
    duration: 3000,
    type: NotificationType.Info,
  });
  const showNotification = (opts: NotificationOptions) => {
    const id = `${Date.now()}-${Math.random()}`;
    setCurrentOptions({ ...opts, id });
    onOpen();
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      <Notification
        key={currentOptions.id}
        isVisible={isOpen}
        onDismiss={onClose}
        title={currentOptions.title}
        subtitle={currentOptions.subtitle}
        duration={currentOptions.duration}
        type={currentOptions.type}
      />
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
