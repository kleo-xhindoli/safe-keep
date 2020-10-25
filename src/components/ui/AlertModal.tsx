import React from "react";
import Modal, { ModalProps, ModalTitle } from "./Modal";
import Icon from "./Icon";

type AlertType = "info" | "warning" | "danger" | "success";

const iconName = {
  info: "InformationCircle",
  warning: "Exclamation",
  danger: "Exclamation",
  success: "CheckCircle",
} as const;

const colorVariant = {
  info: "indigo",
  warning: "yellow",
  danger: "red",
  success: "green",
} as const;

interface AlertModalProps extends ModalProps {
  type: AlertType;
  title?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
}

const AlertModal: React.FC<AlertModalProps> = ({
  type,
  title,
  children,
  ...rest
}) => {
  const color = colorVariant[type];
  const icon = iconName[type];

  return (
    <Modal {...rest}>
      <div className="sm:flex sm:items-start">
        <div
          className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-${color}-100 sm:mx-0 sm:h-10 sm:w-10`}
        >
          <Icon name={icon} className={`h-6 w-6 text-${color}-600`} />
        </div>
        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          {title && <ModalTitle>{title}</ModalTitle>}
          {children}
        </div>
      </div>
    </Modal>
  );
};

export default AlertModal;
