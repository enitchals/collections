import React from 'react';
import './style.css';


const GameOverModal = ({closeModal}) => {
  return (
    <div id='game-over' className='modal' onClick={closeModal}>
      <div className='modal-body' onClick={(e) => {e.stopPropagation()}}>
        Game Over
      </div>
    </div>
  )
}

export default GameOverModal;