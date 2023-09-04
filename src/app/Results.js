import React from 'react';
import './style.css';


const Results = ({results, id}) => {

  const formattedResults = results.reduce((acc, curr) => {return acc.concat(`${curr.join(' ')}`).concat('\n')}, '')
  const formattedText = `${formattedResults}\n Play Collections #${id}: https://playcollections.online/#/${id}`

  const copyText = () => {
    navigator.clipboard.writeText(formattedText);
  }

  return (
    <div id="results">
      {formattedResults}
      <button onClick={copyText}>Copy</button>
    </div>
  )
}

export default Results;