import React, { HTMLProps } from "react";
import cn from "classnames";
import Heading, { HeadingProps } from "./Heading";
import { Transition } from "@headlessui/react";

export interface ModalTitleProps extends HeadingProps {}
export const ModalTitle: React.FC<ModalTitleProps> = (props) => (
  <Heading id="modal-headline" size="lg" as="h3" {...props} />
);

export interface ModalTextProps extends HTMLProps<HTMLParagraphElement> {}
export const ModalText: React.FC<ModalTextProps> = ({ className, ...rest }) => (
  <p className={cn("text-sm leading-5 text-gray-500", className)} {...rest} />
);

export interface ModalProps {
  isOpen: boolean;
  onClose: () => any;
  primaryActionSlot?: React.ReactNode;
  secondaryActionSlot?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  primaryActionSlot,
  secondaryActionSlot,
  children,
}) => {
  return (
    <div
      className={cn(
        "fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center pointer-events-none"
      )}
    >
      <Transition
        show={isOpen}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="fixed inset-0 transition-opacity pointer-events-auto"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </Transition>

      <Transition
        show={isOpen}
        enter="ease-out duration-300"
        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enterTo="opacity-100 translate-y-0 sm:scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full pointer-events-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">{children}</div>

        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
            {primaryActionSlot}
          </span>
          <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
            {secondaryActionSlot}
          </span>
        </div>
      </Transition>
    </div>
  );
};

export default Modal;
