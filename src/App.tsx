import React from "react";
import IconButton from "./components/ui/IconButton";
import classNames from "classnames";
import Button from "./components/ui/Button";
import ActionMenu from "./components/ui/ActionMenu";
import ActionMenuItem from "./components/ui/ActionMenuItem";
import Drawer from "./components/ui/Drawer";
import { useDisclosure } from "./hooks/utils";
import Label from "./components/ui/Label";
import Input from "./components/ui/Input";
import Icon from "./components/ui/Icon";
import { useSecrets } from "./hooks/resources/secrets";

interface AppProps {}

const data = [
  {
    id: "f2e237b8-efad-4a88-8fab-ca8ec2c900da",
    label: "Bank Email",
    value: "mateb76439@brownal.net",
  },
  {
    id: "eb26cebc-814e-492e-b4e6-218669284af5",
    label: "Bank Password",
    value: "NotMyPassword@2020",
  },
  {
    id: "c0ac710d-2067-49f8-a24a-52cab9b703d7",
    label: "Credit Card",
    value: "4716106675885133",
  },
  {
    id: "c0ac710d-2067-49f8-a24a-52cab9b703d5",
    label: "PIN",
    value: "1234",
  },
  {
    id: "c0ac710d-2067-49f8-a24a-52cab9b703d1",
    label: "Long value",
    value: "c0ac710d-2067-49f8-a24a-52cab9b703d5",
  },
];

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
                  "border-b border-gray-200": idx !== data.length,
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
            <Button variant="primary">Save</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <Label className="mb-1">Value</Label>
            <Input placeholder="Value to store in the safe" />
          </div>
          <div>
            <Label className="mb-1">Label</Label>
            <Input placeholder="Label for this value" />
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default App;
