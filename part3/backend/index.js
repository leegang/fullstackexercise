import express from "express";
import morgan from 'morgan';

const app = express();
app.use(express.json());
app.use(morgan('tiny'));




let persons = [{
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

app.delete("/api/persons/:id",(req,res)=>{
  console.log('req.params.id',req.params.id);
  persons = persons.filter(p => String(p.id) !== req.params.id );
  res.sendStatus(204).end()}
);

app.post("/api/persons",(req,res)=>{

  console.log('req',req.body);
  

  const nameList = persons.map(p=>p.name);
  const  getRandomInt = (min, max) =>{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
  };


  console.log('name',nameList);
  

  if ((!req.body.name)||(!req.body.number) ) {
    return res.status(400).json({ 
      error: 'content missing' 
    });
  };

  
  if (nameList.indexOf(req.body.name.toLowerCase()) !== -1 ) {
    return res.status(400).json({ 
      error: 'name must be unique' 
    });
  };

  const newPerson = {
    id:getRandomInt(1000,90000),
    name:req.body.name,
    number:req.body.number
  };

  console.log('newPerson',newPerson);
  
  persons = persons.concat(newPerson);

  res.json(newPerson);
})

  const PORT = 3001;
  app.listen(PORT);
  console.log(`Server running on port ${PORT}`);