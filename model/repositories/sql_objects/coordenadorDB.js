const coordBD =require('../db');
const seguranca =require('../../components/seguranca');

async function selectCoord(){
    const conn = await coordBD.connect();
    const [rows] = await conn.query('SELECT * FROM prof_coordenador;');
    return rows;
}

async function insertCoord(coord){
    const conn = await coordBD.connect();
    const sql = 'INSERT INTO prof_coordenador(nome, cpf) VALUES (?,?);';
    const values = [coord.nome, coord.cpf];
    return await conn.query(sql, values);
}

async function deleteCoord(id){
    const conn = await coordBD.connect();
    const sql = 'DELETE FROM prof_coordenador where id=?;';
    return await conn.query(sql, [cod]);
}

async function updateCoord(coord){
    const conn = await coordBD.connect();
    const sql = 'UPDATE prof_coordenador SET nome=?, cpf=? WHERE id=?;';
    const values = [coord.nome, coord.cpf, coord.id];
    return await conn.query(sql, values);
}


async function getCoordId(id){
    const conn = await coordBD.connect();
    const sql = 'SELECT * FROM prof_coordenador WHERE id =?';
    const values = [id];
    const [rows] = await conn.query(sql, values);
    if(rows.length > 0)
    return rows[0];
    else return null;
}

module.exports = {selectCoord, insertCoord, deleteCoord, updateCoord, getCoordId}
