import React from 'react';
import './style.css';
import Results from './Results';

const GameOverModal = ({closeModal, results, id}) => {
  return (
    <div id='game-over' className='modal' onClick={closeModal}>
      <div className='modal-body' onClick={(e) => {e.stopPropagation()}}>
        <div className='close-modal' onClick={closeModal}>X</div>
        Game Over
        <Results results={results} id={id}/>
      </div>
    </div>
  )
}

export default GameOverModal;
