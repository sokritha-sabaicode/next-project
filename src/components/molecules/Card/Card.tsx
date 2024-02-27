import React from "react";
import Image from "next/image";
interface CardProps {
  id: string;
  name: string;
  email: string;
  image: string;
}
const Card: React.FC<CardProps> = ({ id, name, email, image }) => {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="card mt-5 bg-base-100 shadow-xl w-[500px] border-2 border-blue-300">
          <div className="card-body" key={id}>
            <div className="flex items-center">
              <Image
                src="/vercel.svg"
                height={80}
                width={80}
                className="rounded-full w-[50px] h-[50px]"
                alt="Avatar"
              />
              <div className="flex justify-center flex-col ml-2">
                <h1 className="card-title">Dara</h1>
                <h2 className="mb-2">dara@gmail.com</h2>
              </div>
            </div>
            <div className="card-actions justify-end">
              <button className="btn btn-info w-[100px]">Preview</button>
              <button className="btn btn-error w-[100px]">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { Card };
