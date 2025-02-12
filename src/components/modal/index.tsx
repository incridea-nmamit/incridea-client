import { Dialog, Transition } from "@headlessui/react";
import React, { type FC, Fragment } from "react";
import { IoClose } from "react-icons/io5";

type ModalProps = {
  children: React.ReactNode;
  title: string;
  /**
   * size = 'small' is suited for confirmation modals with just a title and footer buttons. Caps width at 20rem
   */
  size?: "small" | "medium" | "md";
  onClose: () => void;
  showModal: boolean;
  rounded?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
};

const Modal: FC<ModalProps> = ({
  children,
  title,
  size,
  onClose,
  showModal,
  rounded = "2xl",
}) => {
  return (
    <Transition appear show={showModal} as={Fragment}>
      <Dialog as="div" className="relative z-[20]" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
        </Transition.Child>

        <div
          className={`fixed inset-0 z-10 overflow-y-auto p-4 md:p-8 ${
            size === "small" && "mx-auto w-64 md:w-80"
          } ${size === "md" && `mx-auto w-[16rem] md:w-[30rem]`}`}
        >
          <div className="flex min-h-full items-center justify-center py-5 text-center md:py-7">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`w-full max-w-6xl transform overflow-hidden rounded-${rounded} border border-[#D79128] bg-[#054432] bg-opacity-90 text-left align-middle text-gray-100 shadow-xl backdrop-blur-xl transition-all backdrop-filter`}
              >
                <Dialog.Title
                  as="div"
                  className={`flex items-center justify-between p-5 md:p-6 ${
                    size === "small" && "md:pb-2"
                  }`}
                >
                  <h3
                    className={`text-lg font-medium leading-6 text-[#D79128] ${
                      size === "small" && "text-center"
                    }`}
                  >
                    {title}
                  </h3>
                  {/* {size !== "small" && ( */}
                  <button
                    className="z-[50000] cursor-pointer text-gray-400 transition-colors hover:text-white"
                    onClick={onClose}
                  >
                    <IoClose size="1.4rem" />
                  </button>
                  {/* )} */}
                </Dialog.Title>
                {size !== "small" && <hr className="opacity-30" />}
                <div>{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
