//for db
var oracledb = require('oracledb');
const queries = require('./sql/queries');

//for server creation
const express = require("express");
const cors = require("cors");
var app = express();

app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  console.log("Request received")
  res.json({ message: "Welcome to stock market analysis." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}.`);
});

 var conn = (async function(flag,req,res) {
try{
   connection = await oracledb.getConnection({
        user : 'lawande.s',
        password : '384RwI5dGKdQT1Ek3yFKECYI',
        //hostname oracle.cise.ufl.edu
        //port 1521
        //SID orcl
        connectString : "oracle.cise.ufl.edu:1521/orcl"
   });
   console.log("Successfully connected to Oracle!")
   var query;


   if(flag==1){
    const { ISIN } = req.body;
     query = queries.getStockHistory.replace("${ISIN}", ISIN);
   }
   else if(flag==2){
     query=
    `SELECT *
    FROM stocks`
   }
   else if(flag==3){
    const { SSN } = req.body;
    query=
   `SELECT *
   FROM users
   where SSN='${SSN}'`
  }
  else if(flag==4){
    const { ISIN } = req.body;
    query=queries.percent_change.replace("${ISIN}", ISIN);
  }
  else if(flag==5){
    const { ISIN } = req.body;
    query=queries.RSI.replace("${ISIN}", ISIN);
  }
  else if(flag==6){
    const { ISIN } = req.body;
    query=queries.OBV.replace("${ISIN}", ISIN);
  }
  else if(flag==7){
    const { ISIN } = req.body;
    query=queries.MACD.replace("${ISIN}", ISIN);
  }else if(flag==8){
    const { ISIN } = req.body;
    query=queries.AD.replace("${ISIN}", ISIN);
  }



   connection.execute(
     query,[],  
   function(err, result) {
      if (err) {
        console.error(err.message);
        return;
      }
      console.log(result.rows);
      res.json(result.rows);
});

} catch(err) {
    console.log("Error: ", err);
  } finally {
    if (connection) {
      try { 
        await connection.close();
      } catch(err) {
        console.log("Error when closing the database connection: ", err);
      }
    }
  }
});

app.post('/getStockHistory',(req, res) => {conn(1,req, res)});
app.post('/getStockDetails',(req, res) => {conn(2,req, res)});
app.post('/getUser',(req, res) => {conn(3,req, res)});
app.post('/getPercentChange',(req, res) => {conn(4,req, res)});
app.post('/getRSI',(req, res) => {conn(5,req, res)});
app.post('/getOBV',(req, res) => {conn(6,req, res)});
app.post('/getMACD',(req, res) => {conn(7,req, res)});
app.post('/getAccumulationDistribution',(req, res) => {conn(8,req, res)});
