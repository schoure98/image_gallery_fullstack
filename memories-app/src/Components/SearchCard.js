import React from "react";
import { useState } from "react";
import "../Components/SearchBar/SearchBar.css";
import { storage, firestore } from "../firebase_conf";
import { doc, getDocFromCache } from "firebase/firestore";
import { async } from "@firebase/util";

const SearchCard = () => {
  const [searchdata, setSearchdata] = useState(null);
  const [searchValue, setSearchValue] = useState(false);
  const SearchHandle = (e) => {
    e.preventDefault();
    setSearchdata(e.target.value);
    setSearchValue(false);
  };
  const SearchvalueHandle = async (e) => {
    e.preventDefault();
    console.log(searchdata);
    const docRef = doc(firestore, "NotesData", `${searchdata}`);
    try {
        console.log(`${searchdata}`)
      const doc = await getDocFromCache(docRef);
      console.log("Cached document data:", doc.data());
    } catch (e) {
      console.log("Error getting cached document:", e);
    }
  };
  return (
    <div>
      <form class="nosubmit">
        <input
          class="nosubmit"
          id="search_input"
          type="search"
          placeholder="Search..."
          onChange={SearchHandle}
          value={searchdata}
        />
        <button onClick={SearchvalueHandle}>Search</button>
      </form>
    </div>
  );
};

export default SearchCard;
