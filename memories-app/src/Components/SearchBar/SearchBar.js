import React from "react";
import "../SearchBar/SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { useRef, useEffect } from "react";

let element = <FontAwesomeIcon icon={faSearch} />;
function SearchBar() {
  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const options = {
    componentRestrictions: { country: "usa" },
    fields: ["address_components", "geometry", "icon", "name"],
    types: ["establishment"],
  };
  useEffect(() => {
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );
  }, []);

  return (
    <div>
      <form class="nosubmit">
        <input
          ref={inputRef}
          class="nosubmit"
          id="search_input"
          type="search"
          placeholder="Search..."
        />
      </form>
    </div>
  );
}
export default SearchBar;
