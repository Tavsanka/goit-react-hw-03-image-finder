import React from "react";
import PropTypes from "prop-types";
import "./ImageGalleryItem.scss";

const ImageGalleryItem = ({ webformatURL, largeImageURL, onImageClick }) => (
  <li className={"gallery-item"} onClick={() => onImageClick(largeImageURL)}>
    <img src={webformatURL} alt="" className={"gallery-item-image"} />
  </li>
);

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
