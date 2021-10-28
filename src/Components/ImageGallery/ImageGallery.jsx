import React from "react";
import PropTypes from "prop-types";

import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import style from "./ImageGallery.module.css";

function ImageGallery({ imgArr, onOpen }) {
  return (
    <ul
      className={style.ImageGallery}
      onClick={(e) => onOpen(e.target.dataset.source)}
    >
      {imgArr.map(({ webformatURL, id, tags, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          id={id}
          tags={tags}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          // onOpen={onOpen}
        />
      ))}
      {/* {imgArr.map((imgArr) => (
        <ImageGalleryItem key={imgArr.id} imgArr={imgArr} onOpen={onOpen} />
      ))} */}
    </ul>
  );
}

ImageGallery.propTypes = {
  imgArr: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  onOpen: PropTypes.func,
};

export default ImageGallery;
