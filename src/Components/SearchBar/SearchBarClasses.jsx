import { toast } from "react-toastify";
import { useState } from "react";
// import PropTypes from "prop-types";
import style from "./SearchBar.module.css";

function Searchbar({ onSubmit }) {
  const [inputValue, setInputValue] = useState("");

  const handleChange = ({ target }) => {
    setInputValue(target.value.toLowerCase().trim());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { value } = event.target[1];
    if (value.trim() === "") {
      return toast.error("Enter name of picture you are looking for!");
    }
    onSubmit(inputValue); // отпарвка данных
    setInputValue(""); // очищение формы
  };

  return (
    <header className={style.Searchbar}>
      <form onSubmit={handleSubmit} className={style.SearchForm}>
        <button type="submit" className={style.SearchFormButton}>
          <span className={style.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          name="inputValue"
          value={inputValue}
          onChange={handleChange}
          className={style.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

export default Searchbar;
