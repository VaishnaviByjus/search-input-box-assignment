import { useState, useDeferredValue } from "react";

import data from "./data.json";

import Search from "./Search";
import List from "./List";

import "./App.css";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const deferredSearch = useDeferredValue(searchInput.toLowerCase());

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const foundData = data.map((e) => {
    let newRecord = { ...e };
    let found = {};
    if (e.id.includes(deferredSearch)) {
      found.id = deferredSearch;
    }
    if (e.name?.toLowerCase().includes(deferredSearch)) {
      found.name = deferredSearch;
    }
    if (e.address?.toLowerCase().includes(deferredSearch)) {
      found.address = deferredSearch;
    }
    if (e.items?.find((i) => i.name.toLowerCase().includes(deferredSearch))) {
      found.items = deferredSearch;
    }

    if (Object.keys(found).length === 0) found = null;
    newRecord.found = found;
    return newRecord;
  });

  const filterData = foundData.filter((e) => (e.found ? true : false));

  return (
    <div className="container">
      <Search
        placeholder="Search users by id, name, address and items"
        value={searchInput}
        onChange={handleInputChange}
      />
      <br />
      {searchInput !== "" && <List data={filterData} />}
    </div>
  );
}

export default App;
