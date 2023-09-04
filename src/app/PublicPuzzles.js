import React, { useEffect, useState } from 'react';
import './style.css';
import axios from 'axios';

const PublicPuzzles = () => {

  const [puzzleList, setPuzzleList] = useState([]);

  useEffect(() => {
    axios.get(`https://collections-db-25b3859e87bd.herokuapp.com/puzzles/all`)
    .then(res => setPuzzleList(res.data))
  }, []);

  return (
    <div className='Public'>
      <h2>List of Published Puzzles:</h2>
      <ul className='puzzle-list'>
        {puzzleList.map(puzzle => <li><a href={`https://playcollections.online/#/${puzzle.id}`} className='puzzle-link'>{`${puzzle.title || `#${puzzle.id}`}`}</a></li>)}
      </ul>
    </div>
  )
}

export default PublicPuzzles;