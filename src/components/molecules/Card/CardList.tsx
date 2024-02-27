import React, { ReactNode } from "react";
import { Card } from "./Card";
import Image from "next/image";
import Swal from "sweetalert2";
import { Button } from "@/components/atoms";
interface User {
  id: string;
  name: string;
  email: string;
  image: string;
}

interface CardListProps {
  user: User[];
  setUser: React.Dispatch<React.SetStateAction<User[]>>;
  search: string;
}
const CardList: React.FC<CardListProps> = ({ user, setUser, search }) => {
  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure bro?",
      text: "This will delete user from your card lists!",
      icon: "warning",
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: "#FF5861",
      cancelButtonColor: "#00B5FF",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        setUser(user.filter((items) => items.id !== id));
        Swal.fire(
          "Deleted!",
          "The user has been deleted successfully .",
          "success"
        );
      }
    });
  };
  return (
    <>
      <div className="flex justify-end mx-10 my-5 w-[90%]">
        <span className="flex justify-center items-center w-auto bg-gray-500 p-2 mr-2 rounded-md text-white">
          Total User : {user.length}
        </span>
        <Button color="warning" onClick={() => setUser([])}>
          Clear All
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-10 lg:grid lg:grid-cols-2 gap-y-2 mx-auto w-[70%]">
        {user
          .filter((items) => {
            return search.trim() === ""
              ? items
              : items.name &&
                  items.name.toLowerCase().includes(search.toLowerCase());
          })
          .map((items) => (
            <div className="flex justify-center items">
              <div className="card mt-5 bg-base-100 shadow-xl w-[600px] border-2 border-blue-300">
                <div className="card-body">
                  <div className="flex items-center">
                    <Image
                      src={items.image}
                      height={80}
                      width={80}
                      className="rounded-full object-cover w-[80px] h-[80px] mr-2"
                      alt="Avatar"
                    />
                    <div className="flex justify-center flex-col ml-2">
                      <h1 className="card-title">{items.name}</h1>
                      <h2 className="mb-2">{items.email}</h2>
                    </div>
                  </div>
                  <div className="card-actions justify-end">
                    <button className="btn btn-info w-[100px]">Update</button>
                    <button
                      className="btn btn-error w-[100px]"
                      onClick={() => handleDelete(items.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export { CardList };
