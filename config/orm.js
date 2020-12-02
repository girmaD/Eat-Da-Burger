const connection = require('./connection.js');

const orm = {
    selectAll: function(tableName, cb) {
        let queryString = `Select * from ??`;
        connection.query(queryString, [tableName], (err, data) =>{
            if(err) throw err;
            cb(data)
        })
    },
    insertOne: function(tableName, colName, colValue) {
        
    },
    updateOne: function(tableName, colName, colValue, conditionColName, conditionValue) {
       
    }
};

module.exports = orm;