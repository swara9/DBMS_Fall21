//for db connection
// const db = require("./model.js");
// const connection = db.dbConnection;
var oracledb = require('oracledb');

//for server creation
const express = require("express");
const cors = require("cors");
var app = express();

// var corsOptions = {
//     origin: "http://localhost:8081"
// };
  
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
     query=
    `SELECT *
     FROM STOCK_HISTORY
     where ISIN='${ISIN}'`}
   else if(flag==2){
     query=
    `SELECT *
    FROM stocks`
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

app.post('/getStock',(req, res) => {conn(1,req, res)});
app.post('/stockDetails',(req, res) => {conn(2,req, res)});