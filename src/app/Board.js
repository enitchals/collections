import React, { useState, useEffect } from 'react';
import './style.css';
import Square from './Square';
import SolvedRow from './SolvedRow';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import GameOverModal from './GameOverModal';
import GameWonModal from './GameWonModal';

const dummyData = {
  id: 0,
  author: 'Ellen',
  rows: [
    {
      id: 1,
      theme: 'Portland Neighborhoods',
      squares: ['Alberta', 'Hawthorne', 'Laurelhurst', 'Belmont'],
      solved: false
    },
    {
      id: 2,
      theme: 'Mt. ______',
      squares: ['Tabor', 'Hood', 'St. Helens', 'Rainier'],
      solved: false
    },
    {
      id: 3,
      theme: 'Portland Parks',
      squares: ['Washington', 'Mill Ends', 'Forest', 'Waterfront'],
      solved: false
    },
    {
      id: 4,
      theme: 'Tallboys',
      squares: ['PBR', 'Montucky', 'Rolling Rock', 'Schlitz'],
      solved: false
    },
  ]
}

const categoryColors = {
  1: '🟩',
  2: '🟦',
  3: '🟧',
  4: '🟪'
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
  const [guessSquares, setGuessSquares] = useState([])
  const [randomOrder, setRandomOrder] = useState(getRandomOrder(16))
  const [solvedRows, setSolvedRows] = useState([])
  const [modal, setModal] = useState('')

  const {id} = useParams();

  useEffect(() => {
    if (!id) return;
    axios.get(`https://collections-db-25b3859e87bd.herokuapp.com/puzzle/${id}`)
    .then(res => setBoardData(res.data))
  }, [id]);

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

  const recordGuess = (selectedSquares) => {
    const newGuessSquares = [];
    selectedSquares.forEach(guess => {
      boardData.rows.forEach((row,index) => {
        if (row.squares.includes(guess)){
          newGuessSquares.push(categoryColors[index+1])
          console.log(guess);
        }
      })
    })
    setGuesses(guesses.concat([selectedSquares]));
    setGuessSquares(guessSquares.concat([newGuessSquares]))
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
      recordGuess(selectedSquares);
      setSelectedSquares([]);
      setRandomOrder(getRandomOrder(randomOrder.length-4));
      const newSolvedRows = solvedRows.concat({...boardData.rows[index], index: index+1})
      setSolvedRows(newSolvedRows);
      if (newSolvedRows.length === 4) setModal('game-won')
    } else {
      recordGuess(selectedSquares);
      window.alert(`You got ${maxCollection} correct!`)
    }
    if (guesses.length - solvedRows.length >= 4) setModal('game-over')
  }

  const pips = []
  for (let i=0; i<guesses.length - solvedRows.length; i++){
    if (pips.length<4) pips.push('mistake')
  }
  for (let i=guesses.length - solvedRows.length; i<4; i++){
    pips.push('remaining')
  }

  const closeModalHandler = () => {
    setModal('')
  }

  return (
    <>
      {modal === 'game-over' && <GameOverModal closeModal={closeModalHandler} results={guessSquares} id={id}/>}
      {modal === 'game-won' && <GameWonModal closeModal={closeModalHandler} results={guessSquares} id={id}/>}
      <div>#{id} by {boardData.author}</div>
      <div className='button-row'>
        <button onClick={submitGuessClickHandler}>submit</button>
        <button onClick={() => setRandomOrder(getRandomOrder(randomOrder.length))}>shuffle</button>
        <div className='remaining-guesses'>
          {pips.map(status => <div className={`pip-${status}`}></div>)}
        </div>
        <button onClick={() => window.location.replace(`https://playcollections.online/#/create`)}>create</button>
      </div>
      <div className='Board'>
        {solvedRows.map((row) => <SolvedRow key={row} row={row}/>)}
        {randomOrder.map(index => {
          const square = unsolvedSquares[index]
          return <Square
            text={square}
            key={square}
            clickHandler={() => squareClickHandler(square)}
            selected={selectedSquares.includes(square)}
            />
        })}
      </div>
    </>
  )
}

export default Board;