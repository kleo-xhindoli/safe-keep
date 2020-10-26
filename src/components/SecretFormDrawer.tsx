import React, { useRef } from "react";
import { useAddSecret, useUpdateSecret } from "../hooks/resources/secrets";
import useCurrentSafeId from "../hooks/useCurrentSafeId";
import useNotification from "../hooks/useNotification";
import { Secret } from "../types/secret";
import SecretForm, { FormValues } from "./forms/SecretForm";
import Button from "./ui/Button";
import Drawer from "./ui/Drawer";
import { NotificationType } from "./ui/Notification";

interface SecretFormDrawerProps {
  isOpen: boolean;
  secret?: Secret;
  onClose: () => void;
}

const SecretFormDrawer: React.FC<SecretFormDrawerProps> = ({
  isOpen,
  secret,
  onClose,
}) => {
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const safeId = useCurrentSafeId();
  const { showNotification } = useNotification();
  const [addSecret, creating] = useAddSecret(safeId || "");
  const [updateSecret, updating] = useUpdateSecret(safeId || "");

  const handleSubmit = async (values: FormValues) => {
    try {
      if (!secret) {
        await addSecret(values);
      } else {
        await updateSecret(secret.id, values);
      }
      onClose();
    } catch (e) {
      console.log(e);
      showNotification({
        type: NotificationType.Error,
        title: "Could not save the Secret",
        subtitle: e.message,
      });
    }
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={secret ? `Edit ${secret.label}` : "Add a new Secret"}
      subtitle={
        secret
          ? `Update values for ${secret.label}`
          : "Add a new Secret to the safe"
      }
      footer={
        <div>
          <Button className="mr-2" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            isLoading={creating || updating}
            onClick={() => submitButtonRef.current?.click()}
          >
            Save
          </Button>
        </div>
      }
    >
      <SecretForm
        initialValues={secret && { label: secret.label, value: secret.value }}
        ref={submitButtonRef}
        onSubmit={handleSubmit}
      />
    </Drawer>
  );
};

export default SecretFormDrawer;
