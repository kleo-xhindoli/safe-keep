import React from "react";
import IconButton from "./components/ui/IconButton";
import classNames from "classnames";
import Button from "./components/ui/Button";
import ActionMenu from "./components/ui/ActionMenu";
import ActionMenuItem from "./components/ui/ActionMenuItem";
import { useDisclosure } from "./hooks/utils";
import Icon from "./components/ui/Icon";
import { useSecrets } from "./hooks/resources/secrets";
import SecretFormDrawer from "./components/SecretFormDrawer";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [secrets] = useSecrets("safe-1");

  return (
    <div className="flex justify-center bg-gray-100">
      <div className="container px-4 pt-12 h-screen">
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
        <div className="flex flex-col bg-white rounded-lg shadow">
          {secrets?.map((item, idx) => (
            <div
              key={item.id}
              className={classNames(
                "p-2 sm:px-4 flex items-center justify-between",
                {
                  "border-b border-gray-200": idx !== secrets.length - 1,
                }
              )}
            >
              <div className="overflow-hidden">
                <p className="text-gray-500 font-medium text-sm">
                  {item.label}
                </p>
                <p className="text-gray-800 truncate">{item.value}</p>
              </div>
              <div className="flex space-x-1">
                <IconButton icon="ClipboardCopy" />
                <ActionMenu>
                  <ActionMenuItem leftIcon="Eye">Show</ActionMenuItem>
                  <ActionMenuItem leftIcon="ClipboardCopy">Copy</ActionMenuItem>
                  <ActionMenuItem leftIcon="Pencil">Edit</ActionMenuItem>
                  <ActionMenuItem leftIcon="Trash">Delete</ActionMenuItem>
                </ActionMenu>
              </div>
            </div>
          ))}
        </div>
      </div>
      <SecretFormDrawer isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default App;
