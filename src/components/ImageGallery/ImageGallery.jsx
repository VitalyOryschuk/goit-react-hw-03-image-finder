import React from 'react';
import ImageGalleryItem from './ImageGalleryItem';

const ImageGallery = ({ items }) => {
  return (
    <ul className="ImageGallery">
      <ImageGalleryItem items={items} />
    </ul>
  );
};

export default ImageGallery;
