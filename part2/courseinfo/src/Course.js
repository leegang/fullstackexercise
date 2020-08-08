import React from "react";


const Course = (props) => {
    return (
      <>
      <h1>Web Development Curriculum</h1>
        {props.courses.map((course,id) => 
          <Section course={course} key={id} />
        )}
      </>
    );
  };
  
  const Section = (props) => {
    const course = props.course; 
    
  
    const total = course.parts.reduce((s, p) => {
      return s + p.exercises;
    }, 0);
  
    return (
      <>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total total={total} />
      </>
    );
  };
  
  const Header = (props) => {
  
    return (
      <>
        <h2> {props.name} </h2>
      </>
    );
  };
  
  const Content = (props) => {
    console.log('props',props);
    
    return (
      <>
       {props.parts.map((part,id)=> <Part part={part} key={id} />) }
      </>
    );
  };
  
  const Total = (props) => {
  
    return (
      <>
        <p>
          <b> total of {props.total} exercises</b>
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
  

  export default Course;