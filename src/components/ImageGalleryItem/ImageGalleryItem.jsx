import { ImageItem, ImageGalleryItemImage } from './ImageGalleryItem.styled'
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import { useToggle } from 'hooks/useToggle';

export const ImageGalleryItem = ({ item }) => {
  
  const { isOpen, close, toggle } = useToggle();  
  const { webformatURL, largeImageURL } = item;
  
    return <ImageItem onClick={toggle}>
      <ImageGalleryItemImage src={webformatURL} />
      {isOpen && <Modal route={largeImageURL} onClose={close} />}
    </ImageItem>
  };

ImageGalleryItem.propTypes = {
  item: PropTypes.object.isRequired
};
