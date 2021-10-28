import { Component } from "react";
import PropTypes from "prop-types";
import style from "./Modal.module.css";

class Modal extends Component {
  static defaultProps = {
    modalClose: PropTypes.func.isRequired,
  };
  componentDidMount() {
    window.addEventListener("keydown", this.closeModalByESC);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.closeModalByESC);
  }

  closeModalByESC = (e) => {
    if (e.key !== "Escape") {
      return;
    }
    this.props.modalClose();
  };

  render() {
    const { modalImg, modalClose } = this.props;

    return (
      <div className={style.Overlay} onClick={modalClose}>
        <div className={style.Modal}>
          <img src={modalImg} alt="" />
        </div>
      </div>
    );
  }
}

export default Modal;
