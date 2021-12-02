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
  console.log('Reached First function');
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


   if(flag=='getStockHistory'){
    const { ISIN } = req.body;
     query = queries.getStockHistory.replace("${ISIN}", ISIN);
   }
   else if(flag=='getStockDetails'){
     console.log('Reached IF')
     query=
    `SELECT *
    FROM stocks`
   }
   else if(flag=='getUserProfile'){
    const { SSN } = req.body;
    query=
   `SELECT SSN,net_profit_loss, totalInv, net_profit_loss+totalInv as currentValue, funds
   FROM investors
   where SSN='${SSN}'`
  }
  else if(flag=='getPercentChange'){
    const { ISIN } = req.body;
    query=queries.percent_change.replace("${ISIN}", ISIN);
  }
  else if(flag=='getRSI'){
    const { ISIN } = req.body;
    query=queries.RSI.replace("${ISIN}", ISIN);
  }
  else if(flag=='getOBV'){
    const { ISIN } = req.body;
    query=queries.OBV.replace("${ISIN}", ISIN);
  }
  else if(flag=='getMACD'){
    const { ISIN } = req.body;
    query=queries.MACD.replace("${ISIN}", ISIN);
  }else if(flag=='getAccumulationDistribution'){
    const { ISIN } = req.body;
    query=queries.AD.replace("${ISIN}", ISIN);
  }
  else if(flag=='getAllStocks'){
    query=`Select * from stocks`;
  }
  else if(flag=='getStockByISIN'){
    const { ISIN } = req.body;
    query=`select * from stocks where isin='${ISIN}'`;
  }
  else if(flag=='getStockBySymbol'){
    const { symbol } = req.body;
    query=`select * from stocks where symbol='${symbol}'`;
  }
  else if(flag=='getTotalTuples'){
    console.log('Reached here');
    query=`Select sum(data) from (select Count(*) as data from stock_history UNION select Count(*) as data from stocks UNION select Count(*) as data from trade UNION select Count(*) as data from investors UNION select Count(*) as data from email UNION select Count(*) as data from portfolio)`
  }
  else if(flag=='isUserThere'){
    const { SSN } = req.body;
<<<<<<< HEAD
    console.log('Reached is user there! And SSN is: ',SSN);
    query=`Select SSN from investors where SSN='${SSN}'`
=======
    query=`Select SSN from investors where SSN='${SSN}'`
  }
  else if(flag=='getUserPortfolio'){
    const { SSN } = req.body;
    console.log('SSN is: ',SSN);
    query=`SELECT investors.SSN,net_profit_loss, totalInv, net_profit_loss+totalInv as currentValue, funds, symbol,qty, avg_price
    FROM investors join (select SSN, symbol, qty, avg_price from stocks join portfolio on stocks.ISIN=portfolio.ISIN) abc on investors.SSN=abc.SSN 
    where investors.SSN='${SSN}'`
  }else if(flag=='getStockBasic'){
    query=
   `SELECT ISIN,symbol
   FROM stocks`
>>>>>>> 61602567d75c7dc4581aac5d0107722507db7aa6
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


var UserConn = (async function(flag,req,res) {
  try{
     connection = await oracledb.getConnection({
          user : 'lawande.s',
          password : '384RwI5dGKdQT1Ek3yFKECYI',
          connectString : "oracle.cise.ufl.edu:1521/orcl"
     });
     console.log("Successfully connected to Oracle!")
     var query;

    if(flag=='getUserProfile'){
      const { SSN } = req.body;
      query=
     `SELECT SSN,net_profit_loss, totalInv, net_profit_loss+totalInv as currentValue, funds
     FROM investors
     where SSN='${SSN}'`
    }
    connection.execute(
       query,[],  
     function(err, result) {
        if (err) {
          console.error(err.message);
          return;
        }
        var JsonUser={"SSN":result.rows[0][0],"net_profit_loss":result.rows[0][1],"totalInv":result.rows[0][2],"currentValue":result.rows[0][3],"funds":result.rows[0][4]}
        console.log(JsonUser);
        res.json(JsonUser);
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


  var UserPortfolioConn = (async function(flag,req,res) {
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
  
      if(flag=='getUserPortfolio'){
        const { SSN } = req.body;
        query=
        `SELECT investors.SSN,net_profit_loss, totalInv, net_profit_loss+totalInv as currentValue, funds, symbol,qty, avg_price
        FROM investors join (select SSN, symbol, qty, avg_price from stocks join portfolio on stocks.ISIN=portfolio.ISIN) abc on investors.SSN=abc.SSN 
        where investors.SSN='${SSN}'`
      }
      connection.execute(
         query,[],  
       function(err, result) {
          if (err) {
            console.error(err.message);
            return;
          }
          if(result.rows.length==0){
            res.json('No data, check input');
          }
          var portf=[];
          for (var i=0;i<result.rows.length;i++){
            portf[i]={"symbol":result.rows[i][5],"qty":result.rows[i][6], "avg_price":result.rows[i][7]};
          }
          var JsonUser={"SSN":result.rows[0][0],"net_profit_loss":result.rows[0][1],"totalInv":result.rows[0][2],"currentValue":result.rows[0][3],"funds":result.rows[0][4],"portfolio":portf};
          console.log(JsonUser);
          res.json(JsonUser);
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

app.post('/getStockHistory',(req, res) => {conn('getStockHistory',req, res)});
app.post('/getStockDetails',(req, res) => {conn('getStockDetails',req, res)});
app.post('/getUserProfile',(req, res) => {UserConn('getUserProfile',req, res)});
app.post('/getPercentChange',(req, res) => {conn('getPercentChange',req, res)});
app.post('/getRSI',(req, res) => {conn('getRSI',req, res)});
app.post('/getOBV',(req, res) => {conn('getOBV',req, res)});
app.post('/getMACD',(req, res) => {conn('getMACD',req, res)});
app.post('/getAccumulationDistribution',(req, res) => {conn('getAccumulationDistribution',req, res)});
app.post('/getAllStock',(req, res) => {conn('getAllStock',req, res)});
app.post('/getStockByISIN',(req, res) => {conn('getStockByISIN',req, res)});
app.post('/getStockBySymbol',(req, res) => {conn('getStockBySymbol',req, res)});
app.post('/getTotalTuples',(req, res) => {conn('getTotalTuples',req, res)});
app.post('/isUserThere',(req, res) => {conn('isUserThere',req, res)});
app.post('/getUserPortfolio',(req, res) => {UserPortfolioConn('getUserPortfolio',req, res)});
app.get('/getStockBasic',(req, res) => {conn('getStockBasic',req, res)});