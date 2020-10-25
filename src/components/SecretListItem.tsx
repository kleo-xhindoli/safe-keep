import React from "react";
import { Secret } from "../types/secret";
import ActionMenu from "./ui/ActionMenu";
import ActionMenuItem from "./ui/ActionMenuItem";
import IconButton from "./ui/IconButton";

interface SecretListItemProps {
  secret: Secret;
  onDelete?: (secret: Secret) => void;
}

const SecretListItem: React.FC<SecretListItemProps> = ({
  secret,
  onDelete,
}) => {
  return (
    <div
      key={secret.id}
      className={"p-2 sm:px-4 flex items-center justify-between"}
    >
      <div className="overflow-hidden">
        <p className="text-gray-500 font-medium text-sm">{secret.label}</p>
        <p className="text-gray-800 truncate">{secret.value}</p>
      </div>
      <div className="flex space-x-1">
        <IconButton icon="ClipboardCopy" />
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
    </div>
  );
};

export default SecretListItem;
