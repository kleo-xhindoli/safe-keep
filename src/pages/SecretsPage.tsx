import React from "react";
import SecretFormDrawer from "../components/SecretFormDrawer";
import SecretsList from "../components/SecretsList";
import Button from "../components/ui/Button";
import { useSecrets } from "../hooks/resources/secrets";
import useCurrentSafeId from "../hooks/useCurrentSafeId";
import { useDisclosure } from "../hooks/utils";

interface SecretsPageProps {}

const SecretsPage: React.FC<SecretsPageProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  let safeId = useCurrentSafeId();

  const [secrets] = useSecrets(safeId || "");

  return (
    <div className="pb-36">
      <div className="flex justify-end">
        <Button
          className="mb-4 w-full sm:w-auto"
          variant="primary"
          leftIcon="Plus"
          onClick={onOpen}
        >
          Add new Secret
        </Button>
      </div>
      <SecretsList secrets={secrets || []} />

      <SecretFormDrawer isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default SecretsPage;
