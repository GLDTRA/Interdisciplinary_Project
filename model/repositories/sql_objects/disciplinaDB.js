const disciplinaBD =require('../db');
const seguranca =require('../../components/seguranca');

async function selectDisciplina(){
    const conn = await disciplinaBD.connect();
    const [rows] = await conn.query('SELECT * FROM disciplina;');
    return rows;
}

async function insertDisciplina(disciplina){
    const conn = await disciplinaBD.connect();
    const sql = 'INSERT INTO disciplina(nome, id_coordenador, descricao) VALUES (?,?,?);';
    const values = [disciplina.nome, disciplina.id_coordenador, disciplina.descricao];
    return await conn.query(sql, values);
}

async function deleteDisciplina(id){
    const conn = await disciplinaBD.connect();
    const sql = 'DELETE FROM disciplina where id=?;';
    return await conn.query(sql, [id]);
}


async function updateDisciplina(disciplina){
    const conn = await disciplinaBD.connect();
    const sql = 'UPDATE disciplina SET nome=?, id_coordenador=?, descricao=? WHERE id=?;';
    const values = [disciplina.nome, disciplina.id_coordenador, disciplina.descricao, disciplina.id];
    return await conn.query(sql, values);
}


async function getDisciplinaId(id){
    const conn = await disciplinaBD.connect();
    const sql = 'SELECT * FROM disciplina WHERE id =?';
    const values = [id];
    const [rows] = await conn.query(sql, values);
    if(rows.length > 0)
    return rows[0];
    else return null;
}

module.exports = {selectDisciplina, insertDisciplina, deleteDisciplina, updateDisciplina, getDisciplinaId}
