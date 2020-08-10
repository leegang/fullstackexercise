import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [filter, setFilter] = useState("");
  const [allcounties, setAllcountries] = useState([]);

  const handleInput = (event) => {
    console.log('input',event.target.value);
    
    setFilter(event.target.value);
  };

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      console.log("response", response.data);
      setAllcountries(response.data);
    });
  }, []);

  return (
    <div>
      <Filter value={filter} onChange={handleInput} />
      <Results value={allcounties} filter={filter} />
    </div>
  );
}

const Filter = (props) => {
  return (
    <div>
      <form>
        find countries{" "}
        <input value={props.value} onChange={props.onChange}></input>
      </form>
    </div>
  );
};

const Results = (props) => {
  const result = props.value.filter(
    p => p.name.toLowerCase().indexOf(props.filter.toLowerCase()) !== -1
  );

  console.log('result' ,result);
  

  const countryList = result.map((pi) => {
    return <p key={pi.numericCode}> {pi.name}</p>;
  });

  if (result.length  === 1 ) {
    return (
      <><Countryinfo country={result[0]} /></>
    );
  } else if (result.length <= 10 && result.length > 1) {
    return <>{countryList}</>;
  };

  return (
    <>
      {" "}
      <p>Too many matchs,specify another filter.</p>
    </>
  );
};

const Countryinfo = (props) =>{
  return(
    <>
        <h2 > {props.country.name}</h2>
  <p>capital {props.country.capital}</p>
  <p>population {props.country.population}</p>
  <h3>languages</h3>
  <ul>
  {props.country.languages.map(l=><li key={l.iso639_1}>{l.name}</li>)}
  </ul>
        <img  src={props.country.flag}   alt={props.country.name}  width="400"/>
      </>
  )
}

export default App;
