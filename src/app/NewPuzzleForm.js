import React, { useState } from 'react';
import './style.css';
import axios from 'axios';

const NewPuzzleForm = () => {
  const [formData, setFormData] = useState({
    public: null,
    author: '',
    title: '',
    cat1name: '',
    cat1A: '',
    cat1B: '',
    cat1C: '',
    cat1D: '',
    cat2name: '',
    cat2A: '',
    cat2B: '',
    cat2C: '',
    cat2D: '',
    cat3name: '',
    cat3A: '',
    cat3B: '',
    cat3C: '',
    cat3D: '',
    cat4name: '',
    cat4A: '',
    cat4B: '',
    cat4C: '',
    cat4D: '',
  })

  const inputChangeHandler = (e) => {
    const newState = {...formData}
    if (e.target.id === 'public') {
      newState[e.target.id] = !formData.public
    } else {
      newState[e.target.id] = e.target.value;
    }
    setFormData(newState);
  }

  const createNewPuzzle = () => {
    let formComplete = true;
    Object.keys(formData).forEach(key => {
      if (formData[key] === '') formComplete = false;
    })
    if (!formComplete) return;
    const newPuzzle = {
      author: formData.author,
      title: formData.title,
      public: formData.public,
      rows: [
        {
          theme: formData.cat1name,
          squares: [formData.cat1A, formData.cat1B, formData.cat1C, formData.cat1D]
        },
        {
          theme: formData.cat2name,
          squares: [formData.cat2A, formData.cat2B, formData.cat2C, formData.cat2D]
        },
        {
          theme: formData.cat3name,
          squares: [formData.cat3A, formData.cat3B, formData.cat3C, formData.cat3D]
        },
        {
          theme: formData.cat4name,
          squares: [formData.cat4A, formData.cat4B, formData.cat4C, formData.cat4D]
        },
      ]
    }
    axios.post('https://collections-db-25b3859e87bd.herokuapp.com/create', newPuzzle)
      .then(response => window.location.replace(`https://playcollections.online/#/${response.data.id}`))
      .catch(err => {
          console.error(err);
      });
  }

  return (
    <div className='NewPuzzleForm'>
      <h2>Create New Puzzle</h2>
      <div className='main-input'><div className='main-input-label'>Title:</div><input id="title" className='cat-name' placeholder='Puzzle Title' onChange={inputChangeHandler}/></div>
      <div className='main-input'><div className='main-input-label'>Author:</div><input id="author" className='cat-name' placeholder='Author Name' onChange={inputChangeHandler}/></div>
      <div className='main-input'><div className='main-input-label'>List Publicly:</div><input id="public" type="checkbox" className='public-checkbox' onChange={inputChangeHandler}/></div>
      <div className='cat-columns'>
        <div className='cat-column cat-1'>
          <div className='name-input-container'><input id="cat1name" className="cat-name" placeholder='Category 1 Name' onChange={inputChangeHandler}/></div>
          <input id="cat1A" placeholder='Category 1 Word 1' onChange={inputChangeHandler}/>
          <input id="cat1B" placeholder='Category 1 Word 2' onChange={inputChangeHandler}/>
          <input id="cat1C" placeholder='Category 1 Word 3' onChange={inputChangeHandler}/>
          <input id="cat1D" placeholder='Category 1 Word 4' onChange={inputChangeHandler}/>
        </div>
        <div className='cat-column cat-2'>
        <div className='name-input-container'><input id="cat2name" className="cat-name" placeholder='Category 2 Name' onChange={inputChangeHandler}/></div>
          <input id="cat2A" placeholder='Category 2 Word 1' onChange={inputChangeHandler}/>
          <input id="cat2B" placeholder='Category 2 Word 2' onChange={inputChangeHandler}/>
          <input id="cat2C" placeholder='Category 2 Word 3' onChange={inputChangeHandler}/>
          <input id="cat2D" placeholder='Category 2 Word 4' onChange={inputChangeHandler}/>
        </div>
        <div className='cat-column cat-3'>
        <div className='name-input-container'><input id="cat3name" className="cat-name" placeholder='Category 3 Name' onChange={inputChangeHandler}/></div>
          <input id="cat3A" placeholder='Category 3 Word 1' onChange={inputChangeHandler}/>
          <input id="cat3B" placeholder='Category 3 Word 2' onChange={inputChangeHandler}/>
          <input id="cat3C" placeholder='Category 3 Word 3' onChange={inputChangeHandler}/>
          <input id="cat3D" placeholder='Category 3 Word 4' onChange={inputChangeHandler}/>
        </div>
        <div className='cat-column cat-4'>
        <div className='name-input-container'><input id="cat4name" className="cat-name" placeholder='Category 4 Name' onChange={inputChangeHandler}/></div>
          <input id="cat4A" placeholder='Category 4 Word 1' onChange={inputChangeHandler}/>
          <input id="cat4B" placeholder='Category 4 Word 2' onChange={inputChangeHandler}/>
          <input id="cat4C" placeholder='Category 4 Word 3' onChange={inputChangeHandler}/>
          <input id="cat4D" placeholder='Category 4 Word 4' onChange={inputChangeHandler}/>
        </div>
      </div>
      <div className='button-row'>
        <button onClick={createNewPuzzle}>Create</button>
      </div>
    </div>
  )
}

export default NewPuzzleForm;