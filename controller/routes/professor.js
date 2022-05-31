const seguranca = require('../../model/components/seguranca');

const profBanco = require('../../model/repositories/sql_objects/professorDB');
const userBanco = require('../../model/repositories/sql_objects/usuarioDB');
var auxprof = null;
module.exports = function(app){
    
    /*Tela inicial*/
    app.get('/home/docente', async(req, res, next) => {
        try {
            const cpfUser = req.user.cpf;
            const perfilUser = req.user.perfil;
            var professor = await profBanco.getProfessorCpf(cpfUser);
            auxprof = professor;
            if (cpfUser == undefined){
                cpfUser = professor.cpf;
            }
            
            var whatsapp = professor.whatsapp;
            
            if (whatsapp == 1){
                whatsapp = "sim";
            } else {
                whatsapp = "não";
            }

            res.render('professor/HomeDocente', { professor, perfilUser, whatsapp});
        } catch (err){
            next(err);
        }
    });
    
    /*rota da tela de cadastro de professor*/
    app.get('/professor/cadastro', seguranca.checkNotAuthenticated, async(req, res, next) => {
        try {
            const user = req.prof;
            res.render('professor/Cadastro', {user});
        } catch (err){
            next(err);
        }
    });

    /*rota para cadastrar professor*/
    app.post('/cadastro/professor/salvar',  async(req,res) =>{
        try {
            var whats =0;

            if(req.body.whatsapp =='on'){
                whats = 1;
            }

           var professor ={
            cpf: req.body.cpf, 
            nome: req.body.nome, 
            sexo: req.body.sexo, 
            data_nascimento: req.body.data,
            endereco: req.body.endereco, 
            numero: req.body.numero, 
            complemento: req.body.complemento, 
            bairro: req.body.bairro, 
            cidade: req.body.cidade, 
            estado: req.body.estado, 
            cep: req.body.cep, 
            tel_residencial: req.body.telefone, 
            celular: req.body.celular, 
            whatsapp: whats}
        
            var usuario ={
                cpf: req.body.cpf, 
                setor: req.body.setor,
                nome: req.body.nome };

            var resp = await profBanco.getProfessorCpf(professor.cpf);

            if(resp == null){
                profBanco.insertProfessor(professor);
                userBanco.insertUsuario(usuario);
                var mensagem = "professor foi cadastrado!!";
            } else{
                var mensagem = "professor já existe!!";
            }

            res.render('professor/Status', {mensagem})
        }catch (error) {
            console.log(error);
        }
    });

    /*rota para editar alterar professor*/
    app.post('/cadastro/professor/edit/salvar', (req, res) => {
        try {
            
            if (req.body.whats == "sim"){
                var whats = 0;
            } else {
                var whats = 1;
            }
            var professor ={
                registro: auxprof.registro,
                tel_residencial: req.body.tel_residencial, 
                celular: req.body.celular,
                whatsapp: whats};
            profBanco.updateProfessor(professor);
            res.send("Professor foi alterado");

        } catch (error) {
            console.log(professor.registro);
            res.send('professor nao cadastrado');
        }
    });
}
