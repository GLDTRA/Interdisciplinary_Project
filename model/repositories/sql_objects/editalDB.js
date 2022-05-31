const editalBD =require('../db');
const seguranca =require('../../components/seguranca');

async function selectEdital(){
    const conn = await editalBD.connect();
    const [rows] = await conn.query('SELECT * FROM edital;');
    return rows;
}

async function insertEdital(edital){
    const conn = await editalBD.connect();
    const sql = 'INSERT INTO edital(numero, descricao) VALUES (?,?);';
    const values = [edital.numero, edital.descricao];
    return await conn.query(sql, values);
}

async function deleteEdital(id){
    const conn = await editalBD.connect();
    const sql = 'DELETE FROM edital where id=?;';
    return await conn.query(sql, [id]);
}

async function updateEdital(edital){
    const conn = await editalBD.connect();
    const sql = 'UPDATE edital SET numero=?, descricao=? WHERE id=?;';
    const values = [edital.numero, edital.descricao, edital.id];
    return await conn.query(sql, values);
}


async function getEditalId(id){
    const conn = await editalBD.connect();
    const sql = 'SELECT * FROM edital WHERE id =?';
    const values = [id];
    const [rows] = await conn.query(sql, values);
    if(rows.length > 0)
    return rows[0];
    else return null;
}

module.exports = {selectEdital, insertEdital, deleteEdital, updateEdital, getEditalId}
