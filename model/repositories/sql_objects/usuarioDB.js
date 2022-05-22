const usuarioBD =require('../db');
const seguranca =require('../../components/seguranca');

async function selectUsuario(){
    const conn = await usuarioBD.connect();
    const [rows] = await conn.query('SELECT * FROM usuario;');
    return rows;
}

async function insertUsuario(usuario){
    const conn = await usuarioBD.connect();
    const sql = 'INSERT INTO usuario(email, senha) VALUES (?,?);';
    const values = [usuario.email, usuario.senha];
    return await conn.query(sql, values);
}

async function deleteUsuario(id){
    const conn = await usuarioBD.connect();
    const sql = 'DELETE FROM usuario where id=?;';
    return await conn.query(sql, [id]);
}

async function updateUsuario(usuario){
    const conn = await usuarioBD.connect();
    const sql = 'UPDATE usuario SET email=?, senha=? WHERE id=?;';
    const values = [usuario.email, usuario.senha, usuario.id];
    return await conn.query(sql, values);
}


async function getUsuarioId(id){
    const conn = await usuarioBD.connect();
    const sql = 'SELECT * FROM usuario WHERE id =?';
    const values = [id];
    const [rows] = await conn.query(sql, values);
    if(rows.length > 0)
    return rows[0];
    else return null;
}

async function login(email, senha){
    const conn = await usuarioBD.connect();
    const sql = 'SELECT * FROM usuario WHERE email=? and senha=?';
    const values = [email, seguranca.ocultarSenha(senha)];
    const [rows] = await conn.query(sql, values);
    if(rows.length > 0)
        return rows;
    else return null;
}


module.exports = {selectUsuario, insertUsuario, deleteUsuario, updateUsuario, getUsuarioId, login}
