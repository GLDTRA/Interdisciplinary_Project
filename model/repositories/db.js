async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
    return global.connection;

    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://root:alunofatec@localhost:3306/webii");
    console.log("Conectou no MySQL!");
    global.connection = connection;
    return connection;
}

module.exports = {connect}