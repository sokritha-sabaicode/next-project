"use client";
import { useEffect, useState } from "react";
import { Modal, AddForm, CardList, Search } from "@/components";


export default function Home() {
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);


  return (
    <>
      <div>
        <Modal>
          <AddForm user={user} setUser={setUser} />
        </Modal>
        <Search search={search} setSearch={setSearch} />
        <CardList user={user} setUser={setUser} search={search} />
      </div>
    </>
  );
}
