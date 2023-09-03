import React, { useState } from 'react';
import './style.css';
import Square from './Square';
import SolvedRow from './SolvedRow';

const dummyData = {
  id: 1,
  rows: [
    {
      id: 1,
      theme: 'A',
      squares: ['1a', '2a', '3a', '4a'],
      solved: false
    },
    {
      id: 2,
      theme: 'B',
      squares: ['1b', '2b', '3b', '4b'],
      solved: false
    },
    {
      id: 3,
      theme: 'C',
      squares: ['1c', '2c', '3c', '4c'],
      solved: false
    },
    {
      id: 4,
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
  const [selectedSquares, setSelectedSquares] = useState(['1a', '2a', '3a', '4a'])
  const [guesses, setGuesses] = useState([]);
  const [randomOrder, setRandomOrder] = useState(getRandomOrder(16))
  const [solvedRows, setSolvedRows] = useState([])

  const unsolvedSquares = getUnsolvedSquares(boardData);

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
    let maxCollection = 0;
    const index = boardData.rows.findIndex(row => {
      let collection = 0;
      if (row.squares.includes(selectedSquares[0])) collection++;
      if (row.squares.includes(selectedSquares[1])) collection++;
      if (row.squares.includes(selectedSquares[2])) collection++;
      if (row.squares.includes(selectedSquares[3])) collection++;
      if (collection === 4) return true;
      if (collection > maxCollection) maxCollection = collection;
    })
    if (index !== -1) {
      setCategorySolved(index);
      setSelectedSquares([]);
      setGuesses(guesses.concat([selectedSquares]));
      setRandomOrder(getRandomOrder(randomOrder.length-4));
      setSolvedRows(solvedRows.concat(boardData.rows[index]))
    } else {
      setGuesses(guesses.concat([selectedSquares]));
      window.alert(`You got ${maxCollection} correct!`)
    }
    console.log(boardData)
  }

  if (guesses.length - solvedRows.length > 4) window.alert('game over!')

  return (
    <>
      <div className='button-row'>
        <button onClick={submitGuessClickHandler}>submit</button>
        <button onClick={() => setRandomOrder(getRandomOrder(randomOrder.length))}>shuffle</button>
      </div>
      <div className='Board'>
        {solvedRows.map(row => <SolvedRow key={row} row={row}/>)}
        {randomOrder.map(index => {
          const square = unsolvedSquares[index]
          return <Square text={square} key={square} clickHandler={() => squareClickHandler(square)} selected={selectedSquares.includes(square)}/>
        })}
      </div>
    </>
  )
}

export default Board;