import React, { useState, useEffect } from "react";
import personService from "./service/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    getPersons()
  }, []);

  const getPersons = () => {
    personService.getAll().then((response) => {
      console.log(response.data);

      const notNullPersons = response.data.filter((item) => item.name);
      setPersons(notNullPersons);
      console.log("Persons", persons);
      // eslint-disable-next-line
    });
    
  };

  const handleAdd = (event) => {
    event.preventDefault();
    const nameList = persons.map((p) => p.name);
    console.log("nameL", nameList);

    if (nameList.indexOf(newName) !== -1) {
      alert(`${newName} is already added to the phonebook.`);
    } else if (newName !== "") {
      const newPerson = { name: newName, number: newNumber };
      console.log("newPerson", newPerson);
      const newPersons = [...persons];
      personService.create(newPerson).then((res) => {
        newPersons.push(res.data);
        setPersons(newPersons);
        console.log("newPersons", newPersons);
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const handleChangeName = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
    setFilter("");
  };

  const handleChangeFilter = (event) => {
    console.log(event.target.value);
    setFilter(event.target.value);
    setShowAll(false);
  };

  const handleChangeNumber = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
    setFilter("");
  };

  const handleDelete = (name, id) => {
    // e.preventDefault();
    return () => {
      if (window.confirm(`Delete ${name}?`)) {
        personService.remove(id).then((res) => {
          console.log("res.data", res.data);
          getPersons();
        });
      }
    };
  };

  let personToShow = showAll
    ? persons
    : persons.filter(
        (p) => p.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1
      );

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={filter} onChange={handleChangeFilter} />

      <h2>Add a new</h2>

      <PersinForm
        nameValue={newName}
        nameChange={handleChangeName}
        numberValue={newNumber}
        numberChange={handleChangeNumber}
        onClick={handleAdd}
      />
      <h2>Numbers</h2>
      <Persons personToShow={personToShow} onClick={handleDelete} />
    </div>
  );
};

const Filter = (props) => {
  return (
    <div>
      filter shown with: <input value={props.value} onChange={props.onChange} />
    </div>
  );
};

const PersinForm = (props) => {
  return (
    <>
      <form>
        <div>
          name: <input value={props.nameValue} onChange={props.nameChange} />
        </div>
        <div>
          number:{" "}
          <input value={props.numberValue} onChange={props.numberChange} />
        </div>
        <div>
          <button type="submit" onClick={props.onClick}>
            add
          </button>
        </div>
      </form>
    </>
  );
};

const Persons = (props) => {
  return (
    <>
      {props.personToShow.map((person) =>
        person.name ? (
          <p key={person.id}>
            {person.name} {person.number}{" "}
            <button onClick={props.onClick(person.name, person.id)}>
              delete
            </button>
          </p>
        ) : null
      )}
    </>
  );
};

export default App;
