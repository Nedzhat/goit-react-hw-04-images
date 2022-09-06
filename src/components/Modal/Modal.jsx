import { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';
import { ModalOverlay, ModalWindow } from "./Modal.styled"

const modalRoot = document.querySelector('#modal-root'); 

export const Modal = ({route, onClose}) => {

    useEffect(() => {
    const handleKeyDown = e => {
        if (e.code === 'Escape') {
                onClose();
            }
        }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    };
  }, [onClose]);
    
    return createPortal(<ModalOverlay>
        <ModalWindow >
            <img src={route} alt="text" />
        </ModalWindow>
    </ModalOverlay>, modalRoot);
    }


Modal.propTypes = {
    route: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};