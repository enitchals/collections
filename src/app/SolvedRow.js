import React from 'react';
import './style.css';


const SolvedRow = ({row}) => {
  const {squares, theme, id} = row;
  return (
    <div className={`SolvedRow row-${id}`}>
      <div className='solved-theme'>{theme}</div>
      <div className='solved-words'>{squares[0]}, {squares[1]}, {squares[2]}, {squares[3]}</div>
    </div>
  )
}

export default SolvedRow;