import React from "react";
import Image from "next/image";
import { UserModel } from "@/@types/user";
import Swal from "sweetalert2";
import { useUser } from "@/contexts/UserContext";

const Card = ({ item }: { item: UserModel }) => {
  const { deleteUser, setSelectCard, selectCard } = useUser();

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
        deleteUser(id);
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
      <div
        className="flex justify-center items"
        onClick={() => {
          if (selectCard === item.id) {
            setSelectCard(""); // Unselect Card
            return; // Close the function
          }
          setSelectCard(item.id);
        }}
      >
        <div
          className={`card mt-5 bg-base-100 shadow-xl w-[600px] border-2 border-blue-300 ${
            selectCard === item.id && "bg-base-300"
          }`}
        >
          <div className="card-body">
            <div className="flex items-center">
              <Image
                src={item.image as string}
                height={80}
                width={80}
                className="rounded-full object-cover w-[80px] h-[80px] mr-2"
                alt="Avatar"
              />
              <div className="flex justify-center flex-col ml-2">
                <h1 className="card-title">{item.name}</h1>
                <h2 className="mb-2">{item.email}</h2>
              </div>
            </div>
            <div className="card-actions justify-end">
              <button
                className="btn btn-error w-[100px]"
                onClick={(e) => {
                  handleDelete(item.id);
                  e.stopPropagation(); // Prevent the event fireup to the ancestor
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { Card };
