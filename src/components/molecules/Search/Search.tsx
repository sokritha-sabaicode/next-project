// Search.js
import React from "react";
import { InputText } from "@/components/atoms";

interface SearchProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}
const Search: React.FC<SearchProps> = ({ search, setSearch }) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="flex justify-center items-center">
      <InputText
        className="w-full max-w-md"
        size="md"
        placeholder="Search..."
        value={search}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export { Search };
