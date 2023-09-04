import React from 'react';
import './style.css';


const GameWonModal = ({closeModal}) => {
  return (
    <div id='game-won' className='modal' onClick={closeModal}>
      <div className='modal-body' onClick={(e) => {e.stopPropagation()}}>
        You Win!
      </div>
    </div>
  )
}

export default GameWonModal;