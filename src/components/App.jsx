import { useState, useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Searchbar } from "./Searchbar/Searchbar";
import { fetchImages } from "services/api";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export const App = () => {
  const[searchQuery, setSearchQuery] = useState('');
  const[arrImg, setArrImg] = useState([]);
  const[page, setPage] = useState(1);
  const[status, setStatus] = useState(Status.IDLE);
  const[error, setError] = useState(null);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    setStatus(Status.PENDING);

    try {
      const fetchData = async () => {
        const data = await fetchImages(searchQuery, page);
        if (!data) {
          setStatus(Status.REJECTED);
          return;
        }
        
        setArrImg(prevArrImg => {
          return [...prevArrImg, ...data.hits];
        });
        
        setStatus(Status.RESOLVED);
      }
      fetchData();
    } catch (error) {
      console.log(error);
      setError(error);
      setStatus(Status.REJECTED);
    }
  },[searchQuery, page])

 
  
  const handleSubmitForm = searchQuery => {
    setSearchQuery(searchQuery);
    setPage(1);
    setArrImg([]);
  }

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  }
     
  return (<div>
    <Searchbar onSubmit={handleSubmitForm} />
    {arrImg.length > 0 && <ImageGallery items={arrImg} />}
    {status === Status.RESOLVED && <Button text="Load More" loadMore={handleLoadMore} />}
    {status === Status.PENDING && <Loader />}
    {status === Status.REJECTED && <div style={{ display: 'flex', justifyContent: 'center' }}>
      <h1>По вашему запросу, ничего не найдено!</h1><p>{error}</p></div>}
    <ToastContainer />
  </div>);
  };
