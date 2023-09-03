import React, { useState } from 'react';
import './style.css';
import Square from './Square';
import SolvedRow from './SolvedRow';

const dummyData = {
  id: 1,
  rows: [
    {
      theme: 'A',
      squares: ['1a', '2a', '3a', '4a'],
      solved: false
    },
    {
      theme: 'B',
      squares: ['1b', '2b', '3b', '4b'],
      solved: false
    },
    {
      theme: 'C',
      squares: ['1c', '2c', '3c', '4c'],
      solved: false
    },
    {
      theme: 'D',
      squares: ['1d', '2d', '3d', '4d'],
      solved: false
    },
  ]
}

function getRandomPosition(num){
  return Math.floor(Math.random() * num)
}

function getUnsolvedSquares(boardData) {
  return boardData.rows.reduce((acc, curr) => {
    if (curr.solved) return acc;
    return acc.concat(curr.squares);
  }, [])
}

function getRandomOrder(num){
  const indexes = []
  for (let i=0; i<num; i++){
    indexes.push(i)
  }
  return indexes.reduce((acc, curr) => {
    let position = getRandomPosition(num);
    while (acc[position] !== undefined) position = getRandomPosition(num);
    acc[position] = curr;
    return acc;
  }, [])
}

const Board = () => {
  const [boardData, setBoardData] = useState(dummyData);
  const [selectedSquares, setSelectedSquares] = useState([])
  const [guesses, setGuesses] = useState([]);
  const [randomOrder, setRandomOrder] = useState(getRandomOrder(16))

  const unsolvedSquares = getUnsolvedSquares(boardData);

  const solvedRows = boardData.rows.filter(row => row.solved);

  const setCategorySolved = (categoryIndex) => {
    const newData = boardData;
    newData.rows[categoryIndex].solved = true;
    setBoardData(newData)
  }

  const squareClickHandler = (square) => {
    const indexOf = selectedSquares.indexOf(square);
    if (selectedSquares.length > 3 && indexOf === -1) return;
    switch(indexOf){
      case -1:
        setSelectedSquares(selectedSquares.concat([square]));
        break;
      case 0:
        setSelectedSquares(selectedSquares.slice(1));
        break;
      default:
        setSelectedSquares(selectedSquares.slice(0,indexOf).concat(selectedSquares.slice(indexOf+1)))
    }
  }

  const submitGuessClickHandler = () => {
    const index = boardData.rows.findIndex(row => {
      return (
        row.squares.includes(selectedSquares[0]) &&
        row.squares.includes(selectedSquares[1]) &&
        row.squares.includes(selectedSquares[2]) &&
        row.squares.includes(selectedSquares[3])
      )
    })
    if (index !== -1) {
      setCategorySolved(index);
      setSelectedSquares([]);
      setGuesses(guesses.concat([selectedSquares]));
      setRandomOrder(getRandomOrder(randomOrder.length-4));
    } else {
      setGuesses(guesses.concat([selectedSquares]));
    }
    console.log(boardData)
  }

  return (
    <>
    <div className='Board'>
      {solvedRows.map(row => <SolvedRow row={row}/>)}
      {randomOrder.map(index => {
        const square = unsolvedSquares[index]
        return <Square text={square} key={square} clickHandler={() => squareClickHandler(square)} selected={selectedSquares.includes(square)}/>
      })}
    </div>
    <button onClick={submitGuessClickHandler}>submit guess</button>
    </>
  )
}

export default Board;