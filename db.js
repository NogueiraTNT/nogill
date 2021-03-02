const mysql = require('mysql');

module.exports = {
    connection: function () {
        return mysql.createConnection({
            host     : '18.229.96.83',
            port     : 3306,
            user     : 'u12748_ORDS2FKBw9',
            password : 'p6uV5mOQPhAjEHxt9SO!i@rF',
            database : 's12748_minemine'
        });
    },    
    executeSQLQueryParams: function (sql, params, callback) {
        const conn = this.connection();
        conn.query(sql,params, (error, results, fields) => {        
            callback(error, results, fields);
            conn.end();
        });       
    },    
    executeSQLQuery: function (sql, callback) {
        const conn = this.connection();    
        conn.query(sql, (error, results, fields) => {
            callback(error, results, fields);
            conn.end();
        });    
    }
}