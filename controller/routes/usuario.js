const seguranca = require('../../model/components/seguranca');
const usuarioBanco = require('../../model/repositories/sql_objects/usuarioDB');
const profBanco = require('../../model/repositories/sql_objects/professorDB');
const editalBanco = require('../../model/repositories/sql_objects/editalDB');
const coordBanco = require('../../model/repositories/sql_objects/coordenadorDB');
const discBanco = require('../../model/repositories/sql_objects/disciplinaDB');
const concursoBanco = require('../../model/repositories/sql_objects/concursoDB');

module.exports = function(app){
    //ROTAS DE USUÁRIO(ADM)
    
    //ROTA PARA TELA DE CADASTRO DE USUÁRIO
    app.get("/cadastro/usuario",seguranca.autenticar, (req, res) =>{
        if(req.query.fail)
            res.render('usuario/Cadastros', { mensagem: 'Cadastro' });
        else
            res.render('usuario/Cadastros', { mensagem: '' });
    })
    
    //ROTA PARA SALVAR USUÁRIO (CADASTRAR)
    app.post('/cadastro/usuario/salvar', seguranca.autenticar, (req,res) => {
        try {
            console.log(req.body.cpf);
           var usuario ={
            cpf: req.body.cpf, 
            setor: req.body.setor,
            nome: req.body.nome,  
            email: req.body.email,            
            senha: seguranca.ocultarSenha(req.body.senha),
            perfil: 'adm'}
            usuarioBanco.insertUsuario(usuario);
            res.render('usuario/Sucesso', {mensagem: 'cadastrado'});
        } catch (error) {
            console.log(error);
            // res.render('usuario/Cadastros', { title: 'Cadastro',
            //     mensagem: 'Erro no cadastro'});
        }
    });

    //ROTA PARA TELA DE CONSULTA DE USUÁRIO (CONSULTAR)
    app.get('/home/usuario', seguranca.autenticar, async(req, res, next) => {
        try {
                if (req.user.perfil != 'adm') {
                    const cpfUser = req.user.cpf;
                    const professor = await profBanco.getProfessorCpf(cpfUser);
                    res.render('professor/HomeDocente', { professor});
                } else {
                    const usuario = req.user;
                    const docs = await usuarioBanco.selectUsuario();
                    const professor = await profBanco.selectProfessor();
                    const edital = await editalBanco.selectEdital();
                    const coord = await coordBanco.selectCoord();
                    const disc = await discBanco.selectDisciplina();
                    const concurso = await concursoBanco.selectConcurso();
                    res.render('usuario/HomeUsuario', { mensagem: 'Lista de Usuários', docs, professor,
                     usuario, edital, coord, disc, concurso});   
                } 
        } catch (err){
            next(err);
        }
    });
   
    //ROTA PARA TELA DE ALTERAÇÃO DE USUÁRIO
    app.get('/edit/usuario:id', seguranca.autenticar, async (req, res, next) =>{
        try {
            var user = req.user;
            var id = req.params.id;
            const usuario = await usuarioBanco.getUsuarioId(id);
            res.render('usuario/EditUsuario', { mensagem: 'alteracao', usuario, user});
        } catch (err) {
            next(err);
        }
    });

    //ROTA PARA EDIÇÃO DE USUÁRIOS (ALTERAR)
    app.post('/cadastro/usuario/edit/salvar', async(req, res) => {
        var usuario ={
            id: req.body.id,
            cpf: req.body.cpf,
            nome: req.body.nome,  
            setor: req.body.setor,
            perfil: req.body.perfil,
            email: req.body.email,
            senha: seguranca.ocultarSenha(req.body.senha)};
            
            var prof = {
                email: req.body.email,
                cpf: req.body.cpf,
            }
            
        try {
            usuarioBanco.updateUsuario(usuario);
            profBanco.updateProfessorEmail(prof);
            console.log(prof);
            res.render('usuario/Sucesso', { mensagem: 'alterado' });
        } catch (error) {
            res.send(error);
        }
        
    });

    /*rota para alteração de pefil*/
    app.post('/usuario/edit/perfil/salvar', async(req, res) => {
        var usuario ={
            id: req.body.id,
            setor: req.body.setor,
            nome: req.body.nome,  
            email: req.body.email,
            senha: seguranca.ocultarSenha(req.body.senha),            
            perfil: 'adm'};
        
        try {
            usuarioBanco.updateUsuario(usuario);
            res.render('usuario/Sucesso', { mensagem: 'alterado' });
        } catch (error) {
            console.log(usuario);
            res.render('usuario/EditUsuario', { title: 'Edição Cadastro', mensagem: 'Erro no cadastro', usuario });
        }

        
    });
    
    //ROTA PARA DELEÇÃO DE USUÁRIO (DELETAR)
    app.get('/delete/usuario:id', seguranca.autenticar, async(req, res, next) => {
        try {
            const usuario = req.user;
            var id = req.params.id;
            await usuarioBanco.deleteUsuario(id);
            const docs = await usuarioBanco.selectUsuario();
            const professor = await profBanco.selectProfessor();
            const edital = await editalBanco.selectEdital();
            const coord = await coordBanco.selectCoord();
            const disc = await discBanco.selectDisciplina();
            const concurso = await concursoBanco.selectConcurso();
            res.render('usuario/HomeUsuario', { mensagem: 'Usuário excluído com sucesso', docs, 
            professor, usuario, edital, coord, disc, concurso});
        } catch (err) {
            next(err);
        } 
    });    
    //ROTA PARA TELA DE LOGIN 
    app.get('/', seguranca.checkNotAuthenticated, (req, res) =>{
        if (req.query.fail) {
            res.render('login/Login', {mensagemLogin: 'Usuario e/ou senha incorretos!'});
        } else {
          res.render('login/Login', { mensagemLogin: null}); 
        }
    });

    //ROTA PARA CONSULTA DE PROFESSOR
    app.get('/consulta/professor:id', seguranca.autenticar, async (req, res, next) =>{
        try {
            var id = req.params.id;
            const usuario = await usuarioBanco.getUsuarioId(req.user.id);
            const professor = await profBanco.getProfessorId(id);
            var whatsapp = professor.whatsapp;
            if (whatsapp == 1){
                whatsapp = "sim";
            } else {
                whatsapp = "não";
            }
            res.render('usuario/ConsultaProf', { mensagem: 'alteracao', professor, whatsapp, usuario});
        } catch (err) {
            next(err);
        }
    });

    //ROTA DE BUSCA DE PROFESSOR
    app.post('/busca/professor', seguranca.autenticar, async (req, res, next) =>{
        try {
            const usuario = req.user;
            var professor; 
            const profcpf = await profBanco.buscaProfessorCpf(req.body.busca);
            
            const profnome = await profBanco.buscaProfessorNome(req.body.busca);
            
            if (profnome == ""){
                if(profcpf != ""){
                    professor = profcpf;
                    
                } else{
                    res.redirect('/home/usuario');
                }
            } else {
                professor = profnome;
            }          
            
            res.render('usuario/ResultadoBusca', { mensagem: 'professores', usuario, professor});
        } catch (err) {
            next(err);
        }
    });

    app.get('/delete/professor:id', seguranca.autenticar, async(req, res, next) => {
        try {
            const usuario = req.user;
            var id = req.params.id;
            await profBanco.deleteProfessor(id);
            const docs = await usuarioBanco.selectUsuario();
            const professor = await profBanco.selectProfessor();
            const edital = await editalBanco.selectEdital();
            const coord = await coordBanco.selectCoord();
            const disc = await discBanco.selectDisciplina();
            const concurso = await concursoBanco.selectConcurso();
            res.render('usuario/HomeUsuario', { mensagem: 'Usuário excluído com sucesso', docs,
            professor, usuario, edital, coord, disc, concurso});
        } catch (err) {
            next(err);
        }
    });
}