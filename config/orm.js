const connection = require('./connection.js');

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}


// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

const orm = {
    selectAll: function(tableName, cb) {
        let queryString = "Select * from " + tableName + ";"
        connection.query(queryString, (err, data) => {
            if(err) throw err;
            cb(data)
        })
    },
    //INSERT INTO TABALE (COLNAME) VALUES (COLVALUE)
    insertOne: function(tableName, colName, colValue, cb) {
        let query = "INSERT INTO " + tableName;
        query += " (";
        query += colName.toString();
        query += ")";
        query += " VALUES (";
        query += printQuestionMarks(colValue.length);
        query += ")";

        connection.query(query, colValue, function(err, result) {
            if (err) {
              throw err;
            }      
            cb(result);
        });        
    },
    //UPDATE TABLE SET COLNAME= COLVALUE WHERE CONDITION
    updateOne: function(tableName, objColVals, condition, cb) {
       let query = "UPDATE " + tableName;
       query += " SET ";
       query += objToSql(objColVals)
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