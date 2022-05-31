const concursoBD =require('../db');
const seguranca =require('../../components/seguranca');

async function selectConcurso(){
    const conn = await concursoBD.connect();
    const [rows] = await conn.query('SELECT * FROM concurso;');
    return rows;
}

async function insertConcurso(concurso){
    const conn = await concursoBD.connect();
    const sql = 'INSERT INTO concurso(unidade, cidade, id_edital, id_disciplina) VALUES (?,?,?,?);';
    const values = [concurso.unidade, concurso.cidade, concurso.id_edital, concurso.id_disciplina];
    return await conn.query(sql, values);
}

async function deleteConcurso(cod){
    const conn = await concursoBD.connect();
    const sql = 'DELETE FROM concurso where cod=?;';
    return await conn.query(sql, [cod]);
}

async function updateConcurso(concurso){
    const conn = await concursoBD.connect();
    const sql = 'UPDATE concurso SET unidade=?, cidade=?, id_edital=?, id_disciplina=? WHERE cod=?;';
    const values = [concurso.unidade, concurso.cidade, concurso.id_edital, concurso.id_disciplina, concurso.cod];
    return await conn.query(sql, values);
}


async function getConcursoId(cod){
    const conn = await concursoBD.connect();
    const sql = 'SELECT * FROM concurso WHERE cod =?';
    const values = [cod];
    const [rows] = await conn.query(sql, values);
    if(rows.length > 0)
    return rows[0];
    else return null;
}

module.exports = {selectConcurso, insertConcurso, deleteConcurso, updateConcurso, getConcursoId}
