import classNames from "classnames";
import React, { useState } from "react";
import { useDisclosure } from "../hooks/utils";
import { Secret } from "../types/secret";
import ActionMenu from "./ui/ActionMenu";
import ActionMenuItem from "./ui/ActionMenuItem";
import IconButton from "./ui/IconButton";
import Notification, { NotificationType } from "./ui/Notification";

interface SecretListItemProps {
  secret: Secret;
  onDelete?: (secret: Secret) => void;
  isLast?: boolean;
}

const SecretListItem: React.FC<SecretListItemProps> = ({
  secret,
  onDelete,
  isLast,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [notificationOpts, setNotificationOpts] = useState({
    message: "",
    type: NotificationType.Success,
  });

  const copyValue = async () => {
    try {
      await navigator.clipboard.writeText(secret.value);
      setNotificationOpts({
        message: "Copied",
        type: NotificationType.Success,
      });
      onOpen();
    } catch (e) {
      console.error(e);
    }
  };

  const handleCopyValue = async () => {
    try {
      const queryOpts = { name: "clipboard-write", allowWithoutGesture: false };
      // @ts-expect-error (bad typings?)
      const permissionStatus = await navigator.permissions.query(queryOpts);
      // Will be 'granted', 'denied' or 'prompt':
      console.log(permissionStatus.state);

      if (permissionStatus.state === "granted") {
        copyValue();
        return;
      } else if (permissionStatus.state === "denied") {
        setNotificationOpts({
          message: "Could not copy to your device",
          type: NotificationType.Error,
        });
        onOpen();
      }

      // Listen for changes to the permission state
      permissionStatus.onchange = () => {
        console.log(permissionStatus.state);
        copyValue();
      };
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div
      key={secret.id}
      className={classNames("p-2 sm:px-4 flex items-center justify-between", {
        "border-b border-gray-200": !isLast,
      })}
    >
      <div className="overflow-hidden">
        <p className="text-gray-500 font-medium text-sm">{secret.label}</p>
        <p className="text-gray-800 truncate">{secret.value}</p>
      </div>
      <div className="flex space-x-1">
        <IconButton icon="ClipboardCopy" onClick={handleCopyValue} />
        <ActionMenu>
          <ActionMenuItem leftIcon="Eye">Show</ActionMenuItem>
          <ActionMenuItem leftIcon="ClipboardCopy">Copy</ActionMenuItem>
          <ActionMenuItem leftIcon="Pencil">Edit</ActionMenuItem>
          <ActionMenuItem
            as="button"
            onClick={() => onDelete?.(secret)}
            leftIcon="Trash"
          >
            Delete
          </ActionMenuItem>
        </ActionMenu>
      </div>

      <Notification
        isVisible={isOpen}
        onDismiss={onClose}
        title={notificationOpts.message}
        type={notificationOpts.type}
      />
    </div>
  );
};

export default SecretListItem;
