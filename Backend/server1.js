const express = require('express');
const bodyParser = require('body-parser');
var oracledb = require('oracledb');
const cors = require('cors');       //CORS(Cross-origin resource sharing) is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
const port = 3000;

const signin= require('./controllers/signin')
const getStock= require('./controllers/getStock')
//const sendfile = require ('./controllers/downloadfile')
//const addEntry = require ('./controllers/timestamp')
//const resFile = require ('./controllers/recieveFile')

const app = express()
app.use(cors())
app.use(bodyParser.json())

const fileName={name:''};

//const {Client} = require('pg');

/*const client = new Client({
    user: 'lawande.s',
    host: 'oracle.cise.ufl.edu',
    SID:'ORCL',
    password: '384RwI5dGKdQT1Ek3yFKECYI',
    port: 1521,
});
client.connect();*/

const client=
  oracledb.getConnection({
  user : 'lawande.s',
  password : '384RwI5dGKdQT1Ek3yFKECYI',
  host: 'oracle.cise.ufl.edu',
  port: 1521,
  SID: 'orcl',
  connectString : "oracle.cise.ufl.edu:1521/orcl"
});

app.post('/getUser', signin.handleSignin(client))
app.post('/getStock',(req, res) => {register.handleRegister(req, res, client)})
//app.post('/download', (req,res) => {sendfile.handleExcel(req,res,fileName,client)})
//app.get('/recieveFile', (req,res) => {resFile.resFile(req,res,fileName)})
//app.post('/addEntry', (req,res) => {addEntry.timeStamp(req,res,client)})
//app.post('/test', (req,res) => {console.log(req.body)})
//app.post('/test1', (req,res) => {return 'Temp ret'})

app.listen(port, ()=> {
  console.log(`App is running on port ${port}`);
})