import React from 'react';
import './style.css';


const Square = ({text, clickHandler, selected}) => {
  return (
    <div className={selected ? 'Square selected-square' : 'Square'} onClick={clickHandler}>
      {text}
    </div>
  )
}

export default Square;