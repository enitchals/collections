import React from 'react';
import './style.css';
import Board from './Board';
import NewPuzzleForm from './NewPuzzleForm';
import { Routes, Route } from 'react-router-dom';
import PublicPuzzles from './PublicPuzzles';

const App = () => {
  return (
    <div className='App'>
      <h1>Collections</h1>
      <Routes>
        <Route exact path="/" element={<PublicPuzzles/>}/>
        <Route exact path="/:id" element={<Board/>}/>
        <Route exact path="/create" element={<NewPuzzleForm/>}/>
      </Routes>
    </div>
  )
}

export default App;