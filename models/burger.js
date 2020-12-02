const orm = require('../config/orm.js');

const burgers = {
    selectAll: function(cb) {
        orm.selectAll('burgers', (res) => {
            cb(res)
        });
    }
}
module.exports = burgers;