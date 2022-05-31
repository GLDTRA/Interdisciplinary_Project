const professorBD =require('../db');
const seguranca =require('../../components/seguranca');

async function selectProfessor(){
    const conn = await professorBD.connect();
    const [rows] = await conn.query('SELECT * FROM professor;');
    return rows;
}

async function insertProfessor(prof){
    const conn = await professorBD.connect();
    const sql = 'INSERT INTO professor(cpf, nome, sexo, data_nascimento, endereco, numero, complemento, bairro, cidade, estado, cep, tel_residencial, celular, whatsapp) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?);';
    const values = [prof.cpf, prof.nome, prof.sexo, prof.data_nascimento, prof.endereco, prof.numero, prof.complemento, prof.bairro, prof.cidade, prof.estado, prof.cep, prof.tel_residencial, prof.celular, prof.whatsapp];
    return await conn.query(sql, values);
}

async function deleteProfessor(registro){
    const conn = await professorBD.connect();
    const sql = 'DELETE FROM professor where registro=?;';
    return await conn.query(sql, [registro]);
}

async function updateProfessor(prof){
    const conn = await professorBD.connect();
    const sql = 'UPDATE professor SET tel_residencial=?, celular=?, whatsapp=?, email=? WHERE registro=?;';
    const values = [prof.tel_residencial, prof.celular, prof.whatsapp, prof.email, prof.registro];
    return await conn.query(sql, values);
}

async function updateProfessorEmail(prof){
    const conn = await professorBD.connect();
    const sql = 'UPDATE professor SET email=? WHERE cpf=?;';
    const values = [prof.email, prof.cpf];
    return await conn.query(sql, values);
}

async function getProfessorId(registro){
    const conn = await professorBD.connect();
    const sql = 'SELECT * FROM professor WHERE registro =?';
    const values = [registro];
    const [rows] = await conn.query(sql, values);
    if(rows.length > 0)
    return rows[0];
    else return null;
}

async function getProfessorCpf(cpf){
    const conn = await professorBD.connect();
    const sql = 'SELECT * FROM professor WHERE cpf =?';
    const values = [cpf];
    const [rows] = await conn.query(sql, values);
    if(rows.length > 0)
    return rows[0];
    else return null;
}

async function login(email, senha){
    const conn = await professorBD.connect();
    const sql = 'SELECT * FROM professor WHERE email=? and senha=?';
    const values = [email, seguranca.ocultarSenha(senha)];
    const [rows] = await conn.query(sql, values);
    if(rows.length > 0)
        return rows;
    else return null;
}

module.exports = {selectProfessor, insertProfessor, deleteProfessor, updateProfessor, updateProfessorEmail, getProfessorId, getProfessorCpf, login}
