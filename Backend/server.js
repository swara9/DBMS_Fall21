//for db
var oracledb = require('oracledb');
var queries = require('./sql/queries');
var dbconfig = require('./config/dbConfig');
//for server creation
var express = require("express");
var cors = require("cors");
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
var PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}.`);
});


var conn = (async function(flag,req,res) {
try{
  console.log('Reached First function');
   connection = await oracledb.getConnection({
        user : dbconfig.USER,
        password : dbconfig.PASSWORD,
        connectString : dbconfig.HOST+":"+dbconfig.PORT+"/"+dbconfig.SID 
        //"oracle.cise.ufl.edu:1521/orcl"
   });
   console.log("Successfully connected to Oracle!")
   var query;


   if(flag=='getStockHistory'){
    var { ISIN } = req.body;
     query = queries.getStockHistory.replace("${ISIN}", ISIN);
   }
   else if(flag=='getStockDetails'){
     console.log('Reached IF')
     query=
    `SELECT *
    FROM stocks`
   }
   else if(flag=='getUserProfile'){
    var { SSN } = req.body;
    query=
   `SELECT SSN,net_profit_loss, totalInv, net_profit_loss+totalInv as currentValue, funds
   FROM investors
   where SSN='${SSN}'`
  }
  else if(flag=='getPercentChange'){
    var { ISIN } = req.body;
    query=queries.percent_change.replace("${ISIN}", ISIN);
  }
  else if(flag=='getRSI'){
    var { ISIN } = req.body;
    query=queries.RSI.replace("${ISIN}", ISIN);
  }
  else if(flag=='getOBV'){
    var { ISIN } = req.body;
    query=queries.OBV.replace("${ISIN}", ISIN);
  }
  else if(flag=='getMACD'){
    var { ISIN } = req.body;
    query=queries.MACD.replace("${ISIN}", ISIN);
  }else if(flag=='getAccumulationDistribution'){
    var { ISIN } = req.body;
    query=queries.AD.replace("${ISIN}", ISIN);
  }
  else if(flag=='getAllStocks'){
    query=`Select * from stocks`;
  }
  else if(flag=='getStockByISIN'){
    var { ISIN } = req.body;
    query=`select * from stocks where isin='${ISIN}'`;
  }
  else if(flag=='getStockBySymbol'){
    var { symbol } = req.body;
    query=`select * from stocks where symbol='${symbol}'`;
  }
  else if(flag=='getTotalTuples'){
    console.log('Reached here');
    query=`Select sum(data) from (select Count(*) as data from stock_history UNION select Count(*) as data from stocks UNION select Count(*) as data from trade UNION select Count(*) as data from investors UNION select Count(*) as data from email UNION select Count(*) as data from portfolio)`
  }
  else if(flag=='getUserPortfolio'){
    var { SSN } = req.body;
    console.log('SSN is: ',SSN);
    query=`SELECT investors.SSN,net_profit_loss, totalInv, net_profit_loss+totalInv as currentValue, funds, symbol,qty, avg_price
    FROM investors join (select SSN, symbol, qty, avg_price from stocks join portfolio on stocks.ISIN=portfolio.ISIN) abc on investors.SSN=abc.SSN
    where investors.SSN='${SSN}'`
  }
  else if(flag=='isUserThere'){
    var { SSN } = req.body;
    console.log('Reached is user there! And SSN is: ',SSN);
    query=`Select SSN from investors where SSN='${SSN}'`
  }
  else if(flag=='getISIN'){
    var { symbol } = req.body;
    query=`Select ISIN from stocks where symbol='${symbol}'`;
  }
  else if(flag=='checkPortfolio'){
    var { ISIN,SSN } = req.body;
    query=`Select * from portfolio where ISIN='${ISIN}' AND SSN='${SSN}'`;
  }
  
  // else if(flag=='getStockBySymbol'){
  //   var {Symbol}=req.body;
  //   query=
  //  `SELECT *
  //  FROM stocks
  //  Where symbol='${Symbol}'`
  // }
   connection.execute(
     query,[],  
   function(err, result) {
      if (err) {
        console.error(err.message);
        return;
      }
      console.log(result.rows);
      if(flag=='getRSI'){
        var finalData=[];
        var x=0;
        for (var i=0;i<result.rows.length;i++){
          if(result.rows[i][1]!=0){
            finalData[x]=result.rows[i];
            x++;
          }
        }
        res.json(finalData);
      }else if(flag=='getMACD'){
        var finalData=[];
        var x=0;
        for (var i=0;i<result.rows.length;i++){
          if(result.rows[i][7]!=0){
            finalData[x]=result.rows[i];
            x++;
          }
        }
        res.json(finalData);
      }else{
      res.json(result.rows);
      }
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
        user : dbconfig.USER,
        password : dbconfig.PASSWORD,
        connectString : dbconfig.HOST+":"+dbconfig.PORT+"/"+dbconfig.SID 
     });
     console.log("Successfully connected to Oracle!")
     var query;

    if(flag=='getUserProfile'){
      var { SSN } = req.body;
      query=
     `SELECT SSN,name,net_profit_loss, totalInv, net_profit_loss+totalInv as currentValue, funds
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
        var JsonUser={"SSN":result.rows[0][0],"name":result.rows[0][1],"net_profit_loss":result.rows[0][2],"totalInv":result.rows[0][3],"currentValue":result.rows[0][4],"funds":result.rows[0][5]}
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
          user : dbconfig.USER,
          password : dbconfig.PASSWORD,
          connectString : dbconfig.HOST+":"+dbconfig.PORT+"/"+dbconfig.SID 
       });
       console.log("Successfully connected to Oracle!")
       var query;
  
      if(flag=='getUserPortfolio'){
        var { SSN } = req.body;
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

var StockBasicConn = (async function(flag,req,res) {
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
    
        if(flag=='getStockBasic'){
          var { SSN } = req.body;
          query=
          `SELECT ISIN,symbol
          FROM stocks`
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
            var stock=[];
          for (var i=0;i<result.rows.length;i++){
            stock[i]={"ISIN":result.rows[i][0],"Symbol":result.rows[i][1]};
          }
          console.log(stock);
          res.json(stock);
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

var makeTrade = (async function(flag,req,res) {
  var {SSN,type,symbol,price,qty} = req.body;
  let date_ob = new Date();
  var ISIN;
  var query=`Select ISIN from stocks where symbol='${symbol}'`;
  try{
    connection = await oracledb.getConnection({
         user : 'lawande.s',
         password : '384RwI5dGKdQT1Ek3yFKECYI',
         //hostname oracle.cise.ufl.edu
         //port 1521
         //SID orcl
         connectString : "oracle.cise.ufl.edu:1521/orcl"
    });
  async function first() {
    return new Promise((resolve) => {
       connection.execute(
       query,[],  
        function(err, result) {
           if (err) {
             console.error(err.message);
             return;
           }
           ISIN=result.rows[0];
           query=`Select * from portfolio where SSN='${SSN}' AND ISIN='${ISIN}'`;
           console.log('Query is: ',query);
        });
        resolve();
    });
}

  
async function second() {
  return new Promise((resolve) => {
    console.log('Query1 is: ',query);
     connection.execute(
     query,[],  
      function(err, result) {
         if (err) {
           console.error(err.message);
           return;
         }
         if(result.rows.length==0){
          query2=`INSERT INTO TRADE(tradeID,ISIN,SSN,qty,type,trade_date,price,amt)
                VALUES(IDtrade.nextval,'${ISIN}','${SSN}','${qty}','${type}','${date_ob}','${price}','${price*qty}')`;
          }
          else{
            console.log('Update');
          }
        });
        resolve();
    });
}

async function third() {
  return new Promise((resolve) => {
     connection.execute(
     query,[],  
      function(err, result) {
         if (err) {
           console.error(err.message);
           return;
         }else{
          console.log('Trade successful!');
         }
        });
        resolve();
});
}


async function fnAsync() {
  await first();
  await second();
  third();
}
fnAsync();
}catch(err) {
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
      
var getTradeConn = (async function(flag,req,res) {
        try{
           connection = await oracledb.getConnection({
                user : 'lawande.s',
                password : '384RwI5dGKdQT1Ek3yFKECYI',
                connectString : "oracle.cise.ufl.edu:1521/orcl"
           });
           console.log("Successfully connected to Oracle!")
           var query;
      
         
          var { SSN } = req.body;
          query= queries.getTrade.replace("${SSN}", SSN);           
          
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
              var trades=[];
              for (var i=0;i<result.rows.length;i++){
                trades[i]={"trade_date":result.rows[i][5],"symbol":result.rows[i][8], "qty":result.rows[i][3], 
                "price":result.rows[i][6], "amt":result.rows[i][7], "type":result.rows[i][4]};              
              }
          
              res.json(trades);
              
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
           
var enterTrade = (async function(flag,req,res) {
  const {ISIN,SSN,qty,type,price}=req.body;
  var today = new Date();
  var month;
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  if(mm==1){month='JAN'}else if(mm==2){month='FEB'}else if(mm==3){month='MAR'}else if(mm==4){month='APR'}else if(mm==5){month='MAY'}else if(mm==6){month='JUN'}else if(mm==7){month='JUL'}else if(mm==8){month='AUG'}else if(mm==9){month='SEPT'}else if(mm==10){month='OCT'}else if(mm==11){month='NOV'}else if(mm==12){month='DEC'}else if(mm==11){month='DEC'}
      today = dd + '-' + month + '-' + yyyy;
        try{
           connection = await oracledb.getConnection({
              user : dbconfig.USER,
              password : dbconfig.PASSWORD,
              connectString : dbconfig.HOST+":"+dbconfig.PORT+"/"+dbconfig.SID 
           });
           console.log("Successfully connected to Oracle!")
           var query;
            query=
           `INSERT INTO trade
           VALUES (IDtrade.nextval,'${ISIN}','${SSN}',${qty},'${type}','${today}',${price},${price*qty})`

          connection.execute(
             query,[],{ autoCommit: true },
           function(err, result) {
              if (err) {
                console.error(err.message);
                return;
              }
              console.log(result.rows);
              res.json('Added!');
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

var enterInPortfolio = (async function(flag,req,res) {
          const {SSN,ISIN,qty,avg_price}=req.body;
                try{
                   connection = await oracledb.getConnection({
                      user : dbconfig.USER,
                      password : dbconfig.PASSWORD,
                      connectString : dbconfig.HOST+":"+dbconfig.PORT+"/"+dbconfig.SID 
                   });
                   console.log("Successfully connected to Oracle!")
                   var query;
                    query=
                   `INSERT INTO portfolio
                   VALUES ('${SSN}','${ISIN}',${qty},'${avg_price}',0)`
        
                  connection.execute(
                     query,[],{ autoCommit: true },
                   function(err, result) {
                      if (err) {
                        console.error(err.message);
                        return;
                      }
                      console.log(result.rows);
                      res.json('Added!');
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


var updatePortfolio = (async function(flag,req,res) {
              const {SSN,ISIN,qty,avg_price}=req.body;
                try{
                   connection = await oracledb.getConnection({
                      user : dbconfig.USER,
                      password : dbconfig.PASSWORD,
                      connectString : dbconfig.HOST+":"+dbconfig.PORT+"/"+dbconfig.SID 
                   });
                   console.log("Successfully connected to Oracle!")
                   var query;
                    query=
                   `UPDATE portfolio
                    SET qty='${qty}',avg_price='${avg_price}'
                    where SSN='${SSN}' and ISIN='${ISIN}`;
        
                  connection.execute(
                     query,[],{ autoCommit: true },
                   function(err, result) {
                      if (err) {
                        console.error(err.message);
                        return;
                      }
                      console.log(result.rows);
                      res.json('Added!');
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
app.get('/getStockBasic',(req, res) => {StockBasicConn('getStockBasic',req, res)});
app.get('/getStockBySymbol',(req, res) => {StockBasicConn('getStockBySymbol',req, res)});
app.post('/makeTrade',(req, res) => {makeTrade('makeTrade',req, res)});
app.post('/getTrade',(req, res) => {getTradeConn('getTrade',req, res)});
app.post('/enterTrade',(req, res) => {enterTrade('enterTrade',req, res)});
app.post('/getISIN',(req, res) => {conn('getISIN',req, res)});
app.post('/checkPortfolio',(req, res) => {conn('checkPortfolio',req, res)});
app.post('/updatePortfolio',(req, res) => {updatePortfolio('updatePortfolio',req, res)});
app.post('/enterInPortfolio',(req, res) => {enterInPortfolio('enterInPortfolio',req, res)});