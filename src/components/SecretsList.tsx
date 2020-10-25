import React, { useState } from "react";
import { useDeleteSecret } from "../hooks/resources/secrets";
import { useDisclosure } from "../hooks/utils";
import { Secret } from "../types/secret";
import SecretListItem from "./SecretListItem";
import AlertModal from "./ui/AlertModal";
import Button from "./ui/Button";

interface SecretsListProps {
  secrets: Secret[];
}

const SecretsList: React.FC<SecretsListProps> = ({ secrets }) => {
  const [deleteSecret, isDeleteing] = useDeleteSecret("safe-1");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [secretToDelete, setSecretToDelete] = useState<Secret | null>(null);

  const markForDelete = (secret: Secret) => {
    setSecretToDelete(secret);
    onOpen();
  };

  const handleDelete = () => {
    if (!secretToDelete) return;
    try {
      deleteSecret(secretToDelete.id);
      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col bg-white rounded-lg shadow">
      {secrets.map((item, idx) => (
        <SecretListItem
          secret={item}
          key={item.id}
          onDelete={markForDelete}
          isLast={idx === secrets.length - 1}
        />
      ))}

      <AlertModal
        type="danger"
        isOpen={isOpen}
        onClose={onClose}
        title={`Delete ${secretToDelete?.label}`}
        primaryActionSlot={
          <Button
            className="w-full"
            variant="danger"
            isLoading={isDeleteing}
            onClick={handleDelete}
          >
            Delete
          </Button>
        }
        secondaryActionSlot={
          <Button className="w-full" onClick={onClose}>
            Cancel
          </Button>
        }
      >
        <p className="mt-2 text-sm leading-5 text-gray-500">
          Are you sure you want to delete the secret{" "}
          <span className="font-medium">{secretToDelete?.label}</span> from the
          safe? This action cannot be undone.
        </p>
      </AlertModal>
    </div>
  );
};

export default SecretsList;
