import React from "react";
import PropTypes from "prop-types";

import style from "./ImageGalleryItem.module.css";

function ImageGalleryItem({ webformatURL, tags, largeImageURL, onOpen }) {
  return (
    <li className={style.ImageGalleryItem}>
      <img
        onClick={onOpen}
        data-source={largeImageURL}
        src={webformatURL}
        alt={tags}
        className={style.ImageGalleryItemImage}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  tags: PropTypes.string.isRequired,
  onOpen: PropTypes.func,
  largeImageURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
