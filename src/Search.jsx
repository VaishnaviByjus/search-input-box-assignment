import { FaSearch } from "react-icons/fa";

const Search = ({ value, onChange, ...props }) => {
  return (
    <div className="search-box">
      <FaSearch className="search-icon" />
      <input
        type="search"
        className="search-input"
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

export default Search;
