"use client";

import { useState } from "react";
import { Modal, FormSubmission, CardList, Search } from "@/components";
import UserProvider from "@/contexts/UserContext";
import ModalProvider from "@/contexts/ModalContext";

export default function Home() {
  const [search, setSearch] = useState("");

  return (
    <UserProvider>
      <ModalProvider>
        <Modal>
          <FormSubmission />
        </Modal>
      </ModalProvider>

      <Search search={search} setSearch={setSearch} />
      <CardList search={search} />
    </UserProvider>
  );
}
