import React, { useRef } from "react";
import SecretForm from "./forms/SecretForm";
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
            onClick={() => submitButtonRef.current?.click()}
          >
            Save
          </Button>
        </div>
      }
    >
      <SecretForm
        ref={submitButtonRef}
        onSubmit={(values) => console.log(values)}
      />
    </Drawer>
  );
};

export default SecretFormDrawer;
