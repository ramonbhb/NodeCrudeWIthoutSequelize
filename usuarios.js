let express = require('express');
const router = express.Router();
let usuarios = require('./dados.json');

router.get('/', (req,res) => {    
    if (usuarios) {
        res.statusCode = 200;
        res.json({
            usuarios: usuarios, 
            mensagem: "Total de Usuários: " + usuarios.length,
            total: Number(usuarios.length)
        });
    }
    else {
        res.statusCode = 200;
        res.json({usuarios: [],
            mensagem: "Não existem usuários"
        })
    }
});

router.get('/id/:id', (req,res) => {
    let idUser = req.params.id;
    let usuario;    
    for (i=0;i<usuarios.length;i++) {
        if (usuarios[i].id == idUser) {
            usuario = usuarios[i];
            break;
        }
    }
    if (usuario) {
        mensagem = "Usuário encontrado";
    }
    else {
        mensagem = "Não foi possível encontrar um usuário com este id";
    }
    res.statusCode = 200;
    res.json({usuario: usuario, mensagem: mensagem});
})

router.post('/', (req,res) => {
    console.log(req.body);
    body = req.body;
    usuarios.push(body);
    /* criar parte para isso salvar o arquivo json com o array novo de usuarios */
    res.statusCode = 200;
    res.json({usuarios: usuarios, mensagem: "Inserido com Sucesso"});
})

router.get('/matricula/:matricula', (req,res) => {
    let matriculaUser = req.params.matricula;
    let usuario;    
    for (i=0;i<usuarios.length;i++) {
        if (usuarios[i].matricula == matriculaUser) {
            usuario = usuarios[i];
            break;
        }
    }
    if (usuario) {
        mensagem = "Usuário encontrado";
    }
    else {
        mensagem = "Não foi possível encontrar um usuário com esta matricula";
    }
    res.statusCode = 200;
    res.json({usuario: usuario, mensagem: mensagem});
})

router.get('/search', (req,res) => {
    let query = req.query;
    let nomeUser = query.nome;
    let sexoUser = query.sexo;
    let usuariosUser = [];
    let mensagem = "";
    
    if (sexoUser && nomeUser) {
        for (i=0;i<usuarios.length;i++) {
            if (usuarios[i].sexo == sexoUser && usuarios[i].nome == nomeUser ) {
                usuariosUser.push(usuarios[i]);                
            }
        }
    }
    else if (sexoUser && !nomeUser) {
        for (i=0;i<usuarios.length;i++) {  
           // console.log("aqui 2");          
            if (usuarios[i].sexo == sexoUser) {
                usuariosUser.push(usuarios[i]);                                       
            }
        }
    }
    else if (!sexoUser && nomeUser) {
        for (i=0;i<usuarios.length;i++) {
            if (usuarios[i].nome == nomeUser) {
                usuariosUser.push(usuarios[i]);                
            }
        }
    }
    else {
        mensagem = "Faltam parâmetros (sexo, nome)";
    }
    
    if (!mensagem) {
        if (usuariosUser.length > 1) mensagem = "Usuários encontrados";                
        else mensagem = "Não foram encontrados usuários para sua busca";
    }

    res.statusCode = 200;
    res.json({usuarios: usuariosUser, mensagem: mensagem})
});


module.exports = router;