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
    query=
    `select pch.*, 
    ROUND(AVG(percent_change) OVER(ORDER BY sh_date ROWS BETWEEN 10 PRECEDING AND CURRENT ROW),3) as avg_change
    FROM
    (select ch.sh_date, 
    ch.close, 
    DECODE(rownum,1, 0, ROUND(change/LAG(close, 1, 0 ) OVER (ORDER BY sh_date)*100, 3)) as percent_change
    FROM (select sh.*, Decode(rownum, 1, 0, close - LAG(close, 1, 0 ) OVER (ORDER BY sh_date))  as change
        FROM (select sh_date, close from STOCK_HISTORY_WEEKLY where isin = '${ISIN}' order by sh_date) sh) ch) pch
    `
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
app.post('/stockDetails',(req, res) => {conn(2,req, res)});
app.post('/getUser',(req, res) => {conn(3,req, res)});
app.post('/percentChange',(req, res) => {conn(4,req, res)});