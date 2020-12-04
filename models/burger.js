const orm = require('../config/orm.js');

const burgers = {
    selectAll: function(cb) {
        orm.selectAll('burgers', (res) => {
            cb(res)
        });
    },
    inserOne: function(colName, colValue, cb) {
        orm.insertOne('burgers', colName, colValue, (res) => {
            cb(res)
        });
    },
    updateOne: function(colName, colValue, condition, cb) {
        orm.updateOne('burgers', colName, colValue, condition, (res) => {
            cb(res)
        });
    }       
}
// Export the database functions for the controller (burgers_controller.js).
module.exports = burgers;