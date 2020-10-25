import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import SecretFormDrawer from "../components/SecretFormDrawer";
import SecretsList from "../components/SecretsList";
import Button from "../components/ui/Button";
import { useSecrets } from "../hooks/resources/secrets";
import useCurrentSafeId from "../hooks/useCurrentSafeId";
import { useComputed, useDisclosure, useQueryParams } from "../hooks/utils";

interface SecretsPageProps {}

const SecretsPage: React.FC<SecretsPageProps> = () => {
  const {
    isOpen: isCreatePanelOpen,
    onOpen: openCreatePanel,
    onClose: closeCreatePanel,
  } = useDisclosure();
  const {
    isOpen: isEditPanelOpen,
    onOpen: openEditPanel,
    onClose: closeEditPanel,
  } = useDisclosure();

  const safeId = useCurrentSafeId();
  const history = useHistory();
  const editSecretId = useQueryParams().get("edit");

  const [secrets] = useSecrets(safeId || "");
  const editSecret = useComputed(
    () => secrets?.find((s) => s.id === editSecretId),
    [secrets, editSecretId]
  );

  useEffect(() => {
    if (editSecretId) {
      openEditPanel();
    }
  }, [editSecretId, openEditPanel]);

  const handleCloseEditPanel = () => {
    closeEditPanel();
    if (editSecretId) {
      // Allow animation to finish before updating the state
      setTimeout(() => {
        history.push("?");
      }, 1000);
    }
  };

  return (
    <div className="pb-36">
      <div className="flex justify-end">
        <Button
          className="mb-4 w-full sm:w-auto"
          variant="primary"
          leftIcon="Plus"
          onClick={openCreatePanel}
        >
          Add new Secret
        </Button>
      </div>
      <SecretsList secrets={secrets || []} />

      <SecretFormDrawer isOpen={isCreatePanelOpen} onClose={closeCreatePanel} />
      {editSecret && (
        <SecretFormDrawer
          secret={editSecret}
          isOpen={isEditPanelOpen}
          onClose={handleCloseEditPanel}
        />
      )}
    </div>
  );
};

export default SecretsPage;
