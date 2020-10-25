import React, { useRef } from "react";
import { useAddSecret } from "../hooks/resources/secrets";
import SecretForm, { FormValues } from "./forms/SecretForm";
import Button from "./ui/Button";
import Drawer from "./ui/Drawer";

interface SecretFormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const SecretFormDrawer: React.FC<SecretFormDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const [addSecret, loading] = useAddSecret("safe-1");

  const handleSubmit = async (values: FormValues) => {
    console.log("submitting: ", values);
    try {
      await addSecret(values);
      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Add a new item"
      subtitle="Add a new item to the safe"
      footer={
        <div>
          <Button className="mr-2" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            isLoading={loading}
            onClick={() => submitButtonRef.current?.click()}
          >
            Save
          </Button>
        </div>
      }
    >
      <SecretForm ref={submitButtonRef} onSubmit={handleSubmit} />
    </Drawer>
  );
};

export default SecretFormDrawer;
