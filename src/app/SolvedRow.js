import React from 'react';
import './style.css';


const SolvedRow = ({row}) => {
  const {squares, theme} = row;
  return (
    <div className='SolvedRow'>
      <div>{theme}</div>
      <div>{squares[0]}, {squares[1]}, {squares[2]}, {squares[3]}</div>
    </div>
  )
}

export default SolvedRow;