const dbConfig = require("./config/dbConfig.js")
var oracledb = require('oracledb');

console.log(dbConfig.HOST);
let db = (async function() {
    try{
        connection = await oracledb.getConnection({
            user : dbConfig.USER,
            password : dbConfig.PASSWORD,
            //hostname oracle.cise.ufl.edu
            //port 1521
            //SID orcl
            connectString : dbConfig.HOST+":"+dbConfig.PORT+"/"+dbConfig.SID
        });
        console.log("Successfully connected to Oracle!")
        return connection;
        // module.exports = connection;
        // connection.execute(
        // `SELECT *
        // FROM ANIMAL_SHELTER`,
        // [],  
        // function(err, result) {
        // if (err) {
        //     console.error(err.message);
        //     return;
        // }
        // console.log(result.rows);
    // });
    
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
})()

console.log(db)
module.exports = db; 
// export default async () => {
//     return await getDbConnection
// }
// module.exports.dbConnection = async function() {
//     await getDbConnection();
// }


 
