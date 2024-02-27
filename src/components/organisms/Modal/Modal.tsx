"use client";
import React, { ReactNode, useState } from "react";
import {
  Button,
  FloatingButton,
  InputText,
  InputFile,
} from "@/components/atoms";
interface ModalProps {
  children: ReactNode;
}
const Modal: React.FC<ModalProps> = ({ children }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="relative z-50">
        <FloatingButton
          position="bottom-left"
          className="text-white bg-neutral "
          onClick={() => setShowModal(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </FloatingButton>
        {showModal && (
          <div className="absolute inset-0 bg-black bg-opacity-90 flex justify-center items-center h-screen">
            <div className="w-[800px] h-[600px] bg-[#1D232A] rounded-2xl flex justify-center items-center flex-col">
              {children}
              <div className="fixed top-44 right-[560px]">
                <button
                  className="w-[40px] h-[40px] flex justify-center items-center rounded-full m-2 bg-red-800 text-black"
                  onClick={() => setShowModal(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              {/* <div>
                <Button
                  onClick={() => setShowModal(false)}
                  className="mt-2 w-[400px]"
                  size="md"
                  color="primary"
                >
                  Create
                </Button>
              </div> */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export { Modal };
