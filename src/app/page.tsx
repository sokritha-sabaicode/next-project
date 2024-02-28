"use client";

import { useState } from "react";
import { Modal, AddForm, CardList, Search } from "@/components";
import UserProvider from "@/contexts/UserContext";

export default function Home() {
  const [search, setSearch] = useState("");

  return (
    <UserProvider>
      <Modal>
        <AddForm />
      </Modal>
      <Search search={search} setSearch={setSearch} />
      <CardList search={search} />
    </UserProvider>
  );
}
