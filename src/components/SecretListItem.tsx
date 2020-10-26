import classNames from "classnames";
import React from "react";
import useNotification from "../hooks/useNotification";
import { useDisclosure } from "../hooks/utils";
import { Secret } from "../types/secret";
import ActionMenu from "./ui/ActionMenu";
import ActionMenuItem from "./ui/ActionMenuItem";
import IconButton from "./ui/IconButton";
import { NotificationType } from "./ui/Notification";

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
  const { showNotification } = useNotification();
  const { isOpen: isVisible, onToggle } = useDisclosure();

  const copyValue = async () => {
    try {
      await navigator.clipboard.writeText(secret.value);

      showNotification({
        title: `Copied ${secret.label}`,
        type: NotificationType.Success,
        duration: 10000000,
      });
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
        showNotification({
          title: "Failed to copy",
          subtitle: "Could not copy to your device",
          type: NotificationType.Error,
        });
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
        <p className="text-gray-800 truncate">
          {isVisible ? secret.value : "••••••••"}
        </p>
      </div>
      <div className="flex space-x-1">
        <IconButton icon="ClipboardCopy" onClick={handleCopyValue} />
        <ActionMenu>
          <ActionMenuItem
            onClick={onToggle}
            leftIcon={isVisible ? "EyeOff" : "Eye"}
          >
            {isVisible ? "Hide" : "Show"}
          </ActionMenuItem>
          <ActionMenuItem to={`?edit=${secret.id}`} leftIcon="Pencil">
            Edit
          </ActionMenuItem>
          <ActionMenuItem onClick={handleCopyValue} leftIcon="ClipboardCopy">
            Copy
          </ActionMenuItem>
          <ActionMenuItem
            as="button"
            onClick={() => onDelete?.(secret)}
            leftIcon="Trash"
          >
            Delete
          </ActionMenuItem>
        </ActionMenu>
      </div>
    </div>
  );
};

export default SecretListItem;
