import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import Searchbar from "./Components/SearchBar/SearchBar";
import ImageGallery from "./Components/ImageGallery/ImageGallery";
import Button from "./Components/Button/Button";
import Loader from "./Components/Loader/Loader";
import Modal from "./Components/Modal/Modal";
import FetchImages from "./Services/API";

const Status = {
  IDLE: "idle", // стоїть на місці
  PENDING: "pending", // очікується
  RESOLVED: "resolved", // виконалось
  REJECTED: "rejected", // відхилено
};

function App() {
  const [inputValue, setInputValue] = useState("");
  const [imgArr, setImgArr] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [error, setError] = useState("");
  const [status, setStatus] = useState(Status.IDLE);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState("");
  const [handleLoadeMore, setHandleLoadeMore] = useState(false);

  useEffect(() => {
    if (!inputValue) {
      return;
    }
    setStatus(Status.PENDING);
    FetchImages(inputValue, pageNumber)
      .then((imgArr) => {
        if (!imgArr.hits.length) {
          return (
            setStatus(Status.REJECTED),
            alert("No such pictures, try again"),
            // this.setState({
            setError(
              (error) => `${error}. Something went wrong, please try again`
            )
          );
          //   status: "rejected",
          // });
        } else {
          const data = imgArr.hits.map(
            ({ id, tags, webformatURL, largeImageURL }) => {
              return {
                id,
                webformatURL,
                tags,
                largeImageURL,
              };
            }
          );
          setImgArr((prevState) => {
            return [...prevState, ...data];
          });
          setStatus(Status.RESOLVED);
          setHandleLoadeMore(true);
        }
        scroll();
      })
      .catch((error) => {
        setError((error) => `${error}. Something went wrong, please try again`);
        setStatus(Status.REJECTED);
      });
  }, [pageNumber, inputValue]);

  const scroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };
  const pageIncrement = () => {
    setPageNumber(pageNumber + 1);
    setStatus(Status.PENDING);
  };

  const handleSubmit = (inputValue) => {
    setInputValue(inputValue);
    setImgArr([]);
    setPageNumber(1);
  };

  const hendelOpenModal = (img) => {
    setIsModalOpen(true);
    setLargeImageURL(img);
  };

  const hendelCloseModal = () => {
    setIsModalOpen(false);
    setLargeImageURL("");
  };

  return (
    <>
      <ToastContainer autoClose={3000} />
      <Searchbar onSubmit={handleSubmit} />
      {status === Status.IDLE && (
        <h2 className="invitation">Use Search above!</h2>
      )}
      {status === Status.PENDING && (
        <>
          <ImageGallery imgArr={imgArr} onOpen={hendelOpenModal} />
          <Loader />
        </>
      )}
      {status === Status.REJECTED && <h1>{error.message}</h1>}
      {status === Status.RESOLVED && (
        <>
          <ImageGallery imgArr={imgArr} onOpen={hendelOpenModal} />
          {handleLoadeMore && <Button onClick={pageIncrement} />}
        </>
      )}
      {isModalOpen && (
        <Modal modalImg={largeImageURL} modalClose={hendelCloseModal} />
      )}
    </>
  );
}

export default App;
