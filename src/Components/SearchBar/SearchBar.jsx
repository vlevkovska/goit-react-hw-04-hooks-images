import { toast } from "react-toastify";
import { Component } from "react";
import PropTypes from "prop-types";
import style from "./SearchBar.module.css";

class Searchbar extends Component {
  static defaultProps = {
    onSubmit: PropTypes.func.isRequired,
  };
  state = { inputValue: "" };

  handleChange = (event) => {
    this.setState({
      inputValue: event.currentTarget.value.toLowerCase().trim(),
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { value } = event.target[1];
    if (value.trim() === "") {
      return toast.error("Enter name of picture you are looking for!");
    }
    this.props.onSubmit(this.state.inputValue); // отпарвка данных

    this.setState({ inputValue: "" }); // очищение формы
  };

  render() {
    return (
      <header className={style.Searchbar}>
        <form onSubmit={this.handleSubmit} className={style.SearchForm}>
          <button type="submit" className={style.SearchFormButton}>
            <span className={style.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            name="inputValue"
            value={this.state.inputValue}
            onChange={this.handleChange}
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
}

export default Searchbar;
