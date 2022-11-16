import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

let element = <FontAwesomeIcon icon={faSearch} />;
function SearchBar() {
  return (
    <div>
        <form class="nosubmit">
          <input class="nosubmit" type="search" placeholder="Search..." />
        </form>
    </div>
  );
}

export default SearchBar;
