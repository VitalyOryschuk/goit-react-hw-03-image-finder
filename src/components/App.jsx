import React, { Component } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';

const KEY = '14152955-bce4734e6e8c1e6bb8603a6e8';
const URL = `https://pixabay.com/api/?q=ocean&page=1&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;

export default class App extends Component {
  state = {
    images: [],
    pageNumber: '',
    query: '',
    isLoading: false,
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    axios
      .get(URL)
      .then(({ data }) => {
        this.setState({ images: data.hits });
      })
      .catch(console.log)
      .finally(() => this.setState({ isLoading: false }));
  }

  handleSubmit = text => {
    this.setState({ images: [], pageNumber: 1, query: text });
  };

  render() {
    const { images, isLoading } = this.state;
    return (
      <div>
        <SearchBar onHandleSubmit={this.handleSubmit} />
        {isLoading && <Loader />}
        {images.length > 0 && <ImageGallery items={images} />}
        <Modal />
        <Button />
      </div>
    );
  }
}
