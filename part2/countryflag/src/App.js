import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [filter, setFilter] = useState("");
  const [allcounties, setAllcountries] = useState([]);

  const handleInput = (event) => {
    console.log("input", event.target.value);

    setFilter(event.target.value);
  };

  const handleShow = (x) => {
    return () => {
      setFilter(x.name);
    };
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
      <Results value={allcounties} filter={filter} onClick={handleShow} />
    </div>
  );
};

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
  var result = props.value.filter(
    (p) => p.name.toLowerCase().indexOf(props.filter.toLowerCase()) !== -1
  );

  console.log("result", result);

  if (result.length === 1) {
    return (
      <>
        <Countryinfo country={result[0]} />
      </>
    );
  } else if (result.length <= 10 && result.length > 1) {
    return (
      <>
        <CountryList countries={result} onClick={props.onClick} />
      </>
    );
  }

  return (
    <>
      {" "}
      <p>Too many matchs,specify another filter.</p>
    </>
  );
};

const CountryList = (props) => {
  const countries = props.countries;

  return (
    <>
      {countries.map((pi) => (
        <div key={pi.numericCode}>
          {" "}
          {pi.name} <button onClick={props.onClick(pi)}>show</button>
        </div>
      ))}
    </>
  );
};

const Countryinfo = (props) => {
  const countryName = props.country.name;

  return (
    <>
      <h2> {countryName}</h2>
      <p>capital {props.country.capital}</p>
      <p>population {props.country.population}</p>
      <h3>languages</h3>
      <ul>
        {props.country.languages.map((l) => (
          <li key={l.iso639_1}>{l.name}</li>
        ))}
      </ul>
      <img src={props.country.flag} alt={props.country.name} width="100px" />
      <Wether country={countryName} />
    </>
  );
};

const Wether = (props) => {
  const [wetherData, setWetherData] = useState([]);
  const [hasData, setHasData] = useState(false);
  const apiKey = process.env.REACT_APP_API_KEY;
  const queryUrl = String(
    `http://api.weatherstack.com/current?access_key=${apiKey}&query=${props.country}`
  );

  console.log('queryUrl',queryUrl);
  
  useEffect(() => {
    axios.get(queryUrl).then((response) => {
      console.log("wetherData", response.data);
      setWetherData(response.data);
      setHasData(true);
      console.log("wetherData", response.data);
    });
  }, [queryUrl]);

  return hasData?(
    <div>
      <h2>Wether in {wetherData.location.name}</h2>
      <p><b>Temperature:</b>{wetherData.current.temperature}</p>
  <p><b>Wind:</b>{wetherData.current.wind_degree}mph direction {wetherData.current.wind_dir}</p>
      <img alt="" src={wetherData.current.weather_icons[0]} />
    </div>
  ):null;
};

export default App;
