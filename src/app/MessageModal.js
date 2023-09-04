import React from 'react';
import './style.css';

const MessageModal = ({closeModal, message}) => {
  return (
    <div className='modal' onClick={closeModal}>
      <div className='modal-body' onClick={(e) => {e.stopPropagation()}}>
      <div className='close-modal' onClick={closeModal}>X</div>
        {message}
      </div>
    </div>
  )
}

export default MessageModal;