async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
    return global.connection;

    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://root:24017878@localhost:3306/sap_database");
    console.log("Conectou no MySQL!");
    global.connection = connection;
    return connection;
}

module.exports = {connect}