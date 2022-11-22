import React from "react";
import MemoryCard from "../../Components/MemoryCards";
import SearchBar from "../../Components/SearchBar/SearchBar";

const Memories = () => {
  return (
    <div>
      <SearchBar />
      <MemoryCard />
    </div>
  );
};

export default Memories;
