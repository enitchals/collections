import React from 'react';
import './style.css';
import Board from './Board';
import NewPuzzleForm from './NewPuzzleForm';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div className='App'>
      <h1>Collections</h1>
      <Routes>
        <Route path="/:id" element={<Board/>}/>
        <Route path="/create" element={<NewPuzzleForm/>}/>
      </Routes>
    </div>
  )
}

export default App;