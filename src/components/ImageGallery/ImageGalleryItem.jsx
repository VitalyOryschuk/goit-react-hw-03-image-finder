import React from 'react';

const ImageGalleryItem = ({ items }) => {
  return items.map(item => (
    <li key={item.id} className="ImageGalleryItem">
      <img src={item.webformatURL} alt={item.tags} className="ImageGalleryItem-image" />
    </li>
  ));
};

export default ImageGalleryItem;
