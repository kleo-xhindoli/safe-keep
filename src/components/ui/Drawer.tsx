import React from "react";
import IconButton from "./IconButton";
import { Transition } from "@headlessui/react";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => any;
  title?: string;
  subtitle?: string;
  header?: React.ReactElement;
  footer?: React.ReactElement;
}

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  header,
  footer,
  subtitle,
  title,
  children,
}) => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 overflow-hidden">
        <Transition
          as="section"
          show={isOpen}
          enter="transform transition ease-in-out duration-500 sm:duration-700"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transform transition ease-in-out duration-500 sm:duration-700"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
          className="absolute inset-y-0 right-0 pl-10 max-w-full flex"
        >
          <div className="w-screen h-full max-w-md">
            <div className="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl pointer-events-auto">
              <div className="min-h-0 flex-1 flex flex-col pb-6 space-y-6 overflow-y-scroll">
                <header className="px-4 py-6 bg-gray-50 sm:px-6">
                  {header || (
                    <div className="flex items-start justify-between space-x-3">
                      <div className="space-y-1">
                        <h2 className="text-lg leading-7 font-medium text-gray-900">
                          {title}
                        </h2>
                        <p className="text-sm text-gray-500 leading-5">
                          {subtitle}
                        </p>
                      </div>
                      <IconButton
                        icon="X"
                        aria-label="Close panel"
                        onClick={onClose}
                      />
                    </div>
                  )}
                </header>
                <div className="relative flex-1 px-4 sm:px-6">{children}</div>
              </div>

              {footer && (
                <div className="flex-shrink-0 px-4 py-4 space-x-4 flex justify-end">
                  {footer}
                </div>
              )}
            </div>
          </div>
        </Transition>
      </div>
    </div>
  );
};

export default Drawer;
