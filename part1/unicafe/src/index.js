import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [score, setScore] = useState(0);
  // const [average, setAverage] = useState(0);
  // const [positive, setPositive] = useState(0);

  // const setToAverage = () => {
  //   console.log('score:',score);
  //   console.log('all:',all);
  //   const newAverage = score / all;
  //   setAverage(newAverage);
  // };

  const addCount = () => {
    const newAll = all + 1;
    setAll(newAll);
  };

  const setToScore = (x) => {
    const newScore = score + x;
    setScore(newScore);
  };

  const toPercent = (x) => {
    const newX = x * 100;
    return String(newX) + "%";
  };

  // const setToPositive = () => {
  //   const newPositive = toPercent(good / all);
  //   setPositive(newPositive);
  // };

  const handleGood = () => {
    const newGood = good + 1;
    setGood(newGood);
    addCount();
    setToScore(1);
  };

  const handleNeut = () => {
    const newNeutral = neutral + 1;
    setNeutral(newNeutral);
    setToScore(0);
    addCount();
  };

  const handleBad = () => {
    const newBad = bad + 1;
    setBad(newBad);
    addCount();
    setToScore(-1);
  };

  return (
    <div>
      <Headers />
      <FeedButton onClick={handleGood} text="good" />
      <FeedButton onClick={handleNeut} text="neutral" />
      <FeedButton onClick={handleBad} text="bad" />
      <h1>statics</h1>
      <Statics
        good={good}
        bad={bad}
        neutral={neutral}
        all={all}
        score={score}
        average={score / all}
        positive={toPercent(good / all)}
      />
    </div>
  );
};

const Headers = () => {
  return (
    <>
      <h1>give feedback</h1>
    </>
  );
};

const FeedButton = (props) => {
  return (
    <>
      <button onClick={props.onClick}>{props.text} </button>
    </>
  );
};

const Statics = (props) => {
  if (props.all > 0) {
    return (
      <>
        <table>
          <tbody>
            <Static text="good" value={props.good} />
            <Static text="neutral" value={props.neutral} />
            <Static text="bad" value={props.bad} />
            <Static text="all" value={props.all} />
            <Static text="average" value={props.average} />
            <Static text="positive" value={props.positive} />
          </tbody>
        </table>
      </>
    );
  } else {
    return (
      <>
        <p>No feedback given.</p>
      </>
    );
  }
};

const Static = (props) => {
  return (
    <>
      <tr>
        <td> {props.text}</td>
        <td> {props.value}</td>
      </tr>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
