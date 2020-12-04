const connection = require('./connection.js');


const orm = {
    selectAll: function(tableName, cb) {
        let queryString = "Select * from" + tableName + ";"
        connection.query(queryString, (err, data) => {
            if(err) throw err;
            cb(data)
        })
    },
    //INSERT INTO TABALE (COLNAME) VALUES (COLVALUE)
    insertOne: function(tableName, colName, colValue, cb) {
        let query = "INSERT INTO " + tableName;
        query += " (";
        query += colName;
        query += ")";
        query += " VALUES (";
        query += "?";
        query += ")";

        connection.query(query, colValue, function(err, result) {
            if (err) {
              throw err;
            }      
            cb(result);
        });        
    },
    //UPDATE TABLE SET COLNAME= COLVALUE WHERE CONDITION
    updateOne: function(tableName, colName, colValue, condition, cb) {
       const query = "UPDATE " + tableName;
       query += " SET ";
       query += colName;
       query += " = ";
       query += colValue;
       query += " WHERE ";
       query += condition;
       
       connection.query(query, (err, result) => {
         if(err) throw err;
         cb(result)
       })
    }
};

// Export the orm object for the model (burger.js).
module.exports = orm;