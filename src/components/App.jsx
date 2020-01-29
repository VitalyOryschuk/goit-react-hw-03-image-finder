import React, { Component } from 'react';
import styles from './App.module.css';
import * as fetch from './services/images-api';
import SearchBar from './SearchBar/SearchBar';
import Loader from './Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';

export default class App extends Component {
  state = {
    items: [],
    searchQuery: '',
    pageNumber: 1,
    isLoading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, pageNumber } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.pageNumber !== pageNumber) {
      this.onSearch(searchQuery, pageNumber);
    }
  }

  SubmitSearchBar = text => {
    this.setState({
      searchQuery: text,
      items: [],
      pageNumber: 1,
    });
  };

  onSearch = (searchQuery, pageNumber) => {
    const { scrollHeight } = document.documentElement;

    this.setState({
      isLoading: true,
    });

    fetch
      .fetchImages(searchQuery, pageNumber)
      .then(res =>
        this.setState(state => ({
          items: [...state.items, ...res.data.hits],
        })),
      )
      .catch(error => console.log(error))
      .finally(() => {
        window.scrollTo({
          top: scrollHeight,
          behavior: 'smooth',
        });

        this.setState({
          isLoading: false,
        });
      });
  };

  onLoadMore = () => {
    this.setState(state => ({
      pageNumber: state.pageNumber + 1,
    }));
  };

  render() {
    const { items, isLoading } = this.state;
    return (
      <div className={styles.App}>
        <SearchBar onSubmit={this.SubmitSearchBar} />
        <ImageGallery pictures={items} />
        {isLoading && <Loader />}
        {items.length > 0 && <Button onLoadMore={this.onLoadMore} />}
      </div>
    );
  }
}
