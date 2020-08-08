import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]); 
  const [ newName, setNewName ] = useState('');

  const handleAdd = (event) => {
    event.preventDefault()
    if ( persons.name){
      alert("{newName} is already added to the phonebook." )
    };
    const newPerson = {name:newName};
    console.log('newPerson',newPerson);
    var newPersons = [...persons];
    console.log('newPersons',newPersons);
    
    newPersons.push(newPerson);
    console.log('newPersons',newPersons);
    
    setPersons(newPersons);
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
 };



  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input  value={newName} onChange = {handleChange}/>
        </div>
        <div>
          <button type="submit" onClick={handleAdd}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
       {persons.map( (person,id) => <p key={id}>{person.name}</p>)}
    </div>
  )
}

export default App