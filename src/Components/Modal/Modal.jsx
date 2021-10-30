import { useEffect } from "react";
// import PropTypes from "prop-types";
import style from "./Modal.module.css";

function Modal({ modalImg, modalClose }) {
  useEffect(() => {
    window.addEventListener("keydown", closeModalByESC);

    return () => {
      window.removeEventListener("keydown", closeModalByESC);
    };
  });

  const closeModalByESC = (e) => {
    if (e.key !== "Escape") {
      return;
    }
    modalClose();
  };

  return (
    <div className={style.Overlay} onClick={modalClose}>
      <div className={style.Modal}>
        <img src={modalImg} alt="" />
      </div>
    </div>
  );
}

export default Modal;
