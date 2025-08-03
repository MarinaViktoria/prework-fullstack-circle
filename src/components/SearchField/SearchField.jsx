import { useState } from "react";
import styles from "./SearchField.module.css";

const SearchField = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
    onSearch(event.target.value); //Forward value to parent immediately
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      onSearch(inputValue); //Forward value to parent
      setInputValue("");
    }
  };

  return (
    <div className={styles.wrapper}>
      <input
        id="search"
        name="search"
        placeholder="Filter dishes..."
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SearchField;
