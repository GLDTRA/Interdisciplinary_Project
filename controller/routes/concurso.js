const seguranca = require('../../model/components/seguranca');
const editalBanco = require('../../model/repositories/sql_objects/editalDB');
const coordBanco = require('../../model/repositories/sql_objects/coordenadorDB');
const discBanco = require('../../model/repositories/sql_objects/disciplinaDB');
const concursoBanco = require('../../model/repositories/sql_objects/concursoDB');

const usuarioBanco = require('../../model/repositories/sql_objects/usuarioDB');
const profBanco = require('../../model/repositories/sql_objects/professorDB');

module.exports = function(app){
    //CADASTROS (EDITAL, PROF.COORD, DISCIPLINA, CONCURSO)
    /*EDITAL*/
    app.post('/cadastro/edital/salvar', seguranca.autenticar, (req,res) => {
        try {
           var edital ={
            numero: req.body.num_edital, 
            descricao: req.body.descricao_edital};

            editalBanco.insertEdital(edital);
            
            res.render('usuario/Sucesso', {mensagem: 'Edital cadastrado'});
        } catch (error) {
            console.log(error);
        }
    });
    /*PROF. COORD*/
    app.post('/cadastro/coord/salvar', seguranca.autenticar, (req,res) => {
        try {
           var coord ={
            nome: req.body.nome_coord, 
            cpf: req.body.cpf_coord};
            
            coordBanco.insertCoord(coord);
            
            res.render('usuario/Sucesso', {mensagem: 'Professor coordenador cadastrado'});
        } catch (error) {
            console.log(error);
        }
    });
    /*DISCIPLINA*/
    app.post('/cadastro/disciplina/salvar', seguranca.autenticar, (req,res) => {
        try {
           var disciplina ={
            nome: req.body.nome_disciplina, 
            id_coordenador: req.body.id_coord,
            descricao: req.body.descricao_disciplina};
            
            discBanco.insertDisciplina(disciplina);
            
            res.render('usuario/Sucesso', {mensagem: 'Disciplina cadastrada'});
        } catch (error) {
            console.log(error);
        }
    });
    /*CONCURSO*/
    app.post('/cadastro/concurso/salvar', seguranca.autenticar, (req,res) => {
        try {
           var concurso ={
            unidade: req.body.unidade, 
            cidade: req.body.cidade,
            id_edital: req.body.id_edital,
            id_disciplina: req.body.id_disciplina};

            concursoBanco.insertConcurso(concurso);
            
            res.render('usuario/Sucesso', {mensagem: 'Concurso cadastrado'});
        } catch (error) {
            console.log(error);
        }
    });

    /*ALTERAÇÕES*/
    //EDITAL
    app.get('/edit/edital:id', seguranca.autenticar, async (req, res, next) =>{
        try {
            var id = req.params.id;
            const edital = await editalBanco.getEditalId(id);
            var usuario = req.user;
            res.render('usuario/EditEdital', { mensagem: 'alteracao', edital, usuario});
        } catch (err) {
            next(err);
        }
    });
    app.post('/cadastro/edital/edit/salvar', async(req, res) => {
        var edital ={
            id: req.body.id,
            numero: req.body.num_edital, 
            descricao: req.body.descricao_edital};

        try {
            editalBanco.updateEdital(edital);
            res.render('usuario/Sucesso', { mensagem: 'Edital alterado' });
        } catch (error) {
            res.render('usuario/EditUsuario', { title: 'Edição Cadastro', mensagem: 'Erro no cadastro' });
        }
        
    });
    //PROF. COORDENADOR
    app.get('/edit/coord:id', seguranca.autenticar, async (req, res, next) =>{
        try {
            var id = req.params.id;
            const coord = await coordBanco.getCoordId(id);
            var usuario = req.user;
            res.render('usuario/EditProfCoord', { mensagem: 'alteracao', coord, usuario});
        } catch (err) {
            next(err);
        }
    });
    app.post('/cadastro/coord/edit/salvar', async(req, res) => {
        var coord ={
            id: req.body.id_coord,
            nome: req.body.nome_coord, 
            cpf: req.body.cpf_coord};
            
        try {
            coordBanco.updateCoord(coord);
            res.render('usuario/Sucesso', { mensagem: 'Professor coordenador alterado' });
        } catch (error) {
            res.render('usuario/EditUsuario', { title: 'Edição Cadastro', mensagem: 'Erro no cadastro' });
        }
        
    });

    //DISCIPLINA
    app.get('/edit/disciplina:id', seguranca.autenticar, async (req, res, next) =>{
        try {
            var id = req.params.id;
            const disc = await discBanco.getDisciplinaId(id);
            var usuario = req.user;
            res.render('usuario/EditDisciplina', { mensagem: 'alteracao', disc, usuario});
        } catch (err) {
            next(err);
        }
    });
    app.post('/cadastro/disc/edit/salvar', async(req, res) => {
        var disc ={
            id: req.body.id_disc,
            nome: req.body.nome_disc,
            id_coordenador: req.body.id_coord_disc, 
            descricao: req.body.descricao_disc};
            
        try {
            discBanco.updateDisciplina(disc);
            res.render('usuario/Sucesso', { mensagem: 'Disciplina alterada' });
        } catch (error) {
            res.render('usuario/EditUsuario', { title: 'Edição Cadastro', mensagem: 'Erro no cadastro' });
        }
    });

    //CONCURSO
    app.get('/edit/concurso:cod', seguranca.autenticar, async (req, res, next) =>{
        try {
            var cod = req.params.cod;
            const concurso = await concursoBanco.getConcursoId(cod);
            var usuario = req.user;
            res.render('usuario/EditConcurso', { mensagem: 'alteracao', concurso, usuario});
        } catch (err) {
            next(err);
        }
    });
    app.post('/cadastro/concurso/edit/salvar', async(req, res) => {
        var concurso ={
            cod: req.body.cod,
            unidade: req.body.unidade,
            cidade: req.body.cidade,
            id_edital: req.body.id_edital,
            id_disciplina: req.body.id_disc };
            
        try {
            concursoBanco.updateConcurso(concurso);
            res.render('usuario/Sucesso', { mensagem: 'Concurso alterado' });
        } catch (error) {
            res.render('usuario/EditUsuario', { title: 'Edição Cadastro', mensagem: 'Erro no cadastro' });
        }
    });

    /*DELETAR*/
    /*concurso*/
    app.get('/delete/concurso:cod', seguranca.autenticar, async(req, res, next) => {
        try {
            const usuario = req.user;
            var id = req.params.cod;
            await concursoBanco.deleteConcurso(id);
            const docs = await usuarioBanco.selectUsuario();
            const professor = await profBanco.selectProfessor();
            const edital = await editalBanco.selectEdital();
            const coord = await coordBanco.selectCoord();
            const disc = await discBanco.selectDisciplina();
            const concurso = await concursoBanco.selectConcurso();
            res.render('usuario/HomeUsuario', { mensagem: 'Concurso excluído com sucesso', docs, 
            professor, usuario, edital, coord, disc, concurso});
        } catch (err) {
            next(err);
        }
    });

    /*DISCIPLINA*/
    app.get('/delete/disc:id', seguranca.autenticar, async(req, res, next) => {
        try {
            const usuario = req.user;
            var id = req.params.id;
            await discBanco.deleteDisciplina(id);
            const docs = await usuarioBanco.selectUsuario();
            const professor = await profBanco.selectProfessor();
            const edital = await editalBanco.selectEdital();
            const coord = await coordBanco.selectCoord();
            const disc = await discBanco.selectDisciplina();
            const concurso = await concursoBanco.selectConcurso();
            res.render('usuario/HomeUsuario', { mensagem: 'Disciplina excluída com sucesso', docs, 
            professor, usuario, edital, coord, disc, concurso});
        } catch (err) {
            next(err);
        }
    });

}