const mysql = require('mysql2');

const connectionPool = mysql.createPool({

    host:'localhost',
    // port: '800',
    user:'root',
    password:'',
    database:'db_heroes'

})

module.exports = connectionPool;