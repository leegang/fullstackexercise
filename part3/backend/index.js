import express from "express"

const app = express();

const persons = [{
  id: 1,
  name: "HTML is easy",
  number: "2019-05-30T17:30:31.098Z",
},
{
  id: 2,
  name: "Browser can execute only Javascript",
  number: "2019-05-30T18:39:34.091Z",
},
{
  id: 3,
  name: "GET and POST are the most important methods of HTTP protocol",
  number: "2019-05-30T19:20:14.298Z",
}]
  
app.get("/api/persons", (req,res) => {
  res.json(persons);
});


app.get("/info",(req,res)=>{
  res.send(`
  <p>Phone book has info for ${persons.length} peoples </p>
  <p>${new Date()}  </p>`)
});


app.get("/api/persons/:id",(req,res)=>{
  console.log('req.params.id',req.params.id);
  const person = persons.find(p => String(p.id) === req.params.id );
  if (person){ res.json(person);} else{res.sendStatus(404).end()}
});

  const PORT = 3001;
  app.listen(PORT);
  console.log(`Server running on port ${PORT}`);