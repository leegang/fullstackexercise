import React from "react";
import ReactDOM from "react-dom";

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
      {
        name: "Redux",
        exercises: 11,
        id: 4,
      },
    ],
  };
  return <Course course={course} />;
  
};
const Course = (props) =>{
return (
    <div>
      
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </div>
  );
};


const Header = (props) => {
  return (
    <>
      <h1> {props.course} </h1>
    </>
  );
};

const Content = (props) => {
  console.log(props);
  return (
    <>
      <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} />
      <Part part={props.parts[3]} />
    </>
  );
};

const Total = (props) => {
  console.log(props);
  return (
    <>
      
      <p>
        <b> total of {props.parts[0].exercises +
          props.parts[1].exercises +
          props.parts[2].exercises + props.parts[3].exercises} exercises</b> 
      </p>
    </>
  );
};

const Part = (props) => {
  console.log(props);
  return (
    <>
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    </>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
