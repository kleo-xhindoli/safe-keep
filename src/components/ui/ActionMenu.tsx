import React from "react";
import { Menu, Transition } from "@headlessui/react";
import IconButton from "./IconButton";

interface ActionMenuProps {}

const ActionMenu: React.FC<ActionMenuProps> = ({ children }) => {
  return (
    <div className="relative inline-block text-left">
      <Menu>
        {({ open }) => (
          <>
            {/*
          // @ts-ignore (incorrect as typing) */}
            <Menu.Button as={IconButton} icon="DotsVertical" />
            <Transition
              show={open}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                static
                className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg outline-none z-50"
              >
                <div className="rounded-md bg-white shadow-xs py-1">
                  {children}
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  );
};

export default ActionMenu;
