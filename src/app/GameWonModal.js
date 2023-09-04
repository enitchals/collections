import React from 'react';
import './style.css';
import Results from './Results';

const GameWonModal = ({closeModal, results, id}) => {
  return (
    <div id='game-won' className='modal' onClick={closeModal}>
      <div className='modal-body' onClick={(e) => {e.stopPropagation()}}>
        You Win!
        <Results results={results} id={id}/>
      </div>
    </div>
  )
}

export default GameWonModal;