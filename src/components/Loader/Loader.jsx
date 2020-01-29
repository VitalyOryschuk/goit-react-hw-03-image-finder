import React from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import LoaderItem from 'react-loader-spinner';

const Loader = () => {
  return (
    <div>
      <LoaderItem type="Plane" color="red" height={50} width={100} />
    </div>
  );
};

export default Loader;
