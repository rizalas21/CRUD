const fs = require('fs')
const readline = require('readline')
const path = require('path')

const _dirname = path.resolve()
const dataPath = path.join(_dirname, 'data', 'data.json') 
const data = fs.readFileSync(dataPath, 'utf-8')
const obj= JSON.parse(data)

const express = require('express')
const bodyParser = require('body-parser')
const { get } = require('http')

const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/', (req, res) => { //create router read
  res.render('list', { obj })
})

app.get('/add', (req, res) => {//create router add
  res.render('add')
})

app.post('/add', (req, res) => {
  let dataGet = {
    name: req.body.name,
    height: req.body.height, 
    weight: req.body.weight,
    birthdate: req.body.birthdate,
    married: req.body.married
  };
  if(dataGet.married == 'true') {
    dataGet.married = true;
    obj.push(dataGet)
  } else {
    dataGet.married = false;
    obj.push(dataGet)
  }
  fs.writeFileSync(dataPath, JSON.stringify(obj),'utf-8');
  res.redirect('/')
})

app.get('/delete/:index', (req, res) => {
  const index = req.params.index
  obj.splice(index, 1)
  fs.writeFileSync(dataPath, JSON.stringify(obj),'utf-8')
  res.redirect('/')
})

app.get('/edit/:index', (req, res) => {
  const index = req.params.index
  const item = obj[index]
  res.render('edit', { item })
})

app.post('/edit/:index', (req, res) => {
  const index = req.params.index
  obj[index] = { 
    name: req.body.name,
    height: req.body.height, 
    weight: req.body.weight,
    birthdate: req.body.birthdate,
    married: req.body.married 
  };
  if(obj[index].married == 'true') {
    obj[index].married = true;
  } else{
    obj[index].married = false;
  }
  fs.writeFileSync(dataPath, JSON.stringify(obj), 'utf-8')
  res.redirect('/')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})