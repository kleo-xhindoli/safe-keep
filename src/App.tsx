import React from "react";
import Button from "./components/ui/Button";
import { useDisclosure } from "./hooks/utils";
import Icon from "./components/ui/Icon";
import { useSecrets } from "./hooks/resources/secrets";
import SecretFormDrawer from "./components/SecretFormDrawer";
import SecretsList from "./components/SecretsList";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [secrets] = useSecrets("safe-1");

  return (
    <div className="flex justify-center bg-gray-100">
      <div className="container px-4 pt-12 pb-48 min-h-screen">
        <div className="flex justify-center items-center mb-6">
          <Icon name="LockClosedSolid" className="mr-1 w-6 h-6" />
          <p className="text-2xl text-center font-semibold">SafeKeep</p>
        </div>
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
      </div>
      <SecretFormDrawer isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default App;
