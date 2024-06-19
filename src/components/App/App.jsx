import React, { Component } from "react";
import Searchbar from "../Searchbar/Searchbar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import "./App.scss";

const API_KEY = "43634541-955b403d737b03dd59b369ca9";
const BASE_URL = "https://pixabay.com/api/";

class App extends Component {
  state = {
    images: [],
    query: "",
    page: 1,
    isLoading: false,
    showModal: false,
    largeImageURL: "",
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    const { query, page } = this.state;
    this.setState({ isLoading: true });

    try {
      const response = await fetch(
        `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
      );
      const data = await response.json();

      this.setState((prevState) => ({
        images: [...prevState.images, ...data.hits],
        isLoading: false,
      }));
    } catch (error) {
      console.error("Error fetching images:", error);
      this.setState({ isLoading: false });
    }
  };

  handleSearchSubmit = (query) => {
    this.setState({ query, page: 1, images: [] });
  };

  handleLoadMore = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  };

  openModal = (largeImageURL) => {
    this.setState({ showModal: true, largeImageURL });
  };

  closeModal = () => {
    this.setState({ showModal: false, largeImageURL: "" });
  };

  render() {
    const { images, isLoading, showModal, largeImageURL } = this.state;

    return (
      <div className={"App"}>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery images={images} onImageClick={this.openModal} />
        {isLoading && <Loader />}
        {images.length > 0 && !isLoading && (
          <Button onClick={this.handleLoadMore} />
        )}
        {showModal && (
          <Modal largeImageURL={largeImageURL} onClose={this.closeModal} />
        )}
      </div>
    );
  }
}

export default App;
