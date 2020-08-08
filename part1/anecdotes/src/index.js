import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [scores, setScore] = useState(props.points);
  const [indexOfMax,setIndexOfMax] = useState(0);

  const handleNext = (min, max) => {
    const getRandomArbitrary = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    };
    const newSelected = getRandomArbitrary(min, max);
    setSelected(newSelected);
    console.log("selected", selected);
  };

  const handleVote = () => {
    const copy = [...scores];
    console.log('copy',copy);
    
    copy[selected] += 1;
    console.log("score", copy[selected]);
    const max = Math.max(...copy);
    setScore(copy);
    getIndex(max,copy);
  };

  const getIndex = (max,arr) =>{
    console.log('max',max);
    const newIndex = arr.indexOf(max)||indexOfMax ;
    console.log('newIndex', newIndex);
    return setIndexOfMax(newIndex);
  }
  
  

  return (
    <div>
      <h1>Anecdotes of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {scores[selected]} votes</p>
      <button onClick={handleVote}>Vote</button>
      <button onClick={() => handleNext(0, props.anecdotes.length)}>
        next anecdote
      </button>
      <h1>Anecdotes with most votes</h1>
      <p>{props.anecdotes[indexOfMax]}</p>
      <p>has {scores[indexOfMax]} votes</p>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];
const points = new Array(6 + 1).join("0").split("").map(parseFloat);
console.log("points", points);

ReactDOM.render(
  <App anecdotes={anecdotes} points={points} />,
  document.getElementById("root")
);
