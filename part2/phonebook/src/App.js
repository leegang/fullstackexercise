import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleAdd = (event) => {
    event.preventDefault();
    const nameList = persons.map((p) => p.name);
    console.log("nameL", nameList);

    if (nameList.indexOf(newName) !== -1) {
      alert( `${newName} is already added to the phonebook.`);
    } else  if (newName  !== ''){
      const newPerson = { name: newName ,number:newNumber };
      console.log("newPerson", newPerson);
      var newPersons = [...persons];
      console.log("newPersons", newPersons);
      newPersons.push(newPerson);
      console.log("newPersons", newPersons);
      setPersons(newPersons);
      setNewName("");
      setNewNumber("");
    };


  };

  const handleChangeName = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleChangeNumber = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleChangeName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleChangeNumber} />
        </div>
        <div>
          <button type="submit" onClick={handleAdd}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, id) => (
        <p key={id}>{person.name} {person.number} </p>
      ))}
    </div>
  );
};

export default App;
