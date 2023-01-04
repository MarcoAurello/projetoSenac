// passos no cmd
//npm init 
//npm install express 
// npm install ejs --save
//rodar com nodemon index.js
//html na pasta views com extenção .ejs
// pegar dados do formulario npm install body-parser --save
// usar js para escrever sql npm install --save sequelize
//integrar sequelize e mysql npm install --save mysql2 
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const AlunoModel = require("./database/Aluno");
const Curso = require("./database/Cursos");
const Comentario = require("./database/Comentario");
//const connection = require("./database/database");
//conectanto
const Sequelize = require('sequelize');
const {jsPDF} = require("jspdf");

const connection = new Sequelize('cursosgratuitos','root','362514',{
host:'localhost',
dialect:'mysql'
});
//module.exports = connection;
connection.authenticate()
.then(() =>{
    console.log("conexao feita")
})
.catch((msgErro)=>{
    console.log(msgErro)
})

//motor de desenho de html
app.set('view engine', 'ejs');
//arquivos css e imagens
app.use(express.static('public'));
//entradas do form
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

/*
app.get("/",(req,res) =>{
    var nome = req.params.nome;
    var leng = req.params.leng
    var msg = false
    var produtos = [
        {nome:"picole", preco: 3.5},
        {nome:"chocolate", preco: 4},
        {nome:"bala", preco: 2.5},
        {nome:"paçoca", preco: 1.5},
        {nome:"pipoca", preco: 5.5},
        {nome:"refrigerante", preco: 7.5}
    ]

    res.render("index",{
        nome : nome,
        leng : leng,
        empresa : "senac",
        inscritos : 2000,
        msg: msg,
        produtos : produtos
    });
});



app.get("/home",(req,res) =>{
    res.render("home");
});
  
*/
//rotas
//app.get("/",(req,res) =>{
   // res.render("index");
//});

//app.get("/",(req,res) =>{
 //   res.render("index");
//});

app.get("/",(req,res) =>{
    res.render("cadastro");
});

app.get("/saibaMais",(req,res) =>{
    res.render("saibaMais");
});



/**
 * rota pagina de cursos
 * recebe a lista de cursos ordenados pelo ultimo postado
 */
app.get("/cursos",(req,res) =>{
    Curso.findAll({raw : true, order:[
        ['nome' , 'DESC']
    ]}).then(cursos =>{
        res.render("cursos",{
            cursos : cursos

        });
    }); 
});

app.get("/alunos",(req,res) =>{
    AlunoModel.findAll({raw : true, order:[
        ['id' , 'DESC']
    ]}).then(alunos =>{
        res.render("alunos",{
            alunos : alunos

        });
    }); 
});



/**
 *  rota  curso escolhido
 * findeOne() localiza uma unica condição no banco
 * aonde o id captado esta no banco
 * id : id 
 * se o valor não for indefinido
 * localiza o curso
 * se n;ao localizar
 * envia para outra rota
 * 
 */
app.get("/cursoEscolhido/:id",(req,res) =>{
    var id = req.params.id;
    
    Curso.findOne({
        where: {id : id }
    }).then(cursoEscolhido => {
        if(cursoEscolhido != undefined){
            Comentario.findAll({
                where: {cursoid : cursoEscolhido.id}
            }).then(comentarios=>{
                res.render("cursoEscolhido",{ 
                    cursoEscolhido :cursoEscolhido,
                    comentarios : comentarios

            }) 
             });
        }else{
            console.log("o valor e " , id)
            //res.redirect("/"); 
            
        }

    })  
 });

 //--------------
 

 //--------
//filtrando moda
 app.get("/Saude",(req,res) =>{
    

    Curso.findAll({
        where: {categoria : "Saude e Beleza" }
    }).then(cursos =>{
        res.render("Saude",{
            cursos : cursos

        });
    }); 
});

//tecnologia e negocios
app.get("/tecnologia",(req,res) =>{
    

    Curso.findAll({
        where: {categoria : "Tecnologia e Negocios" }
    }).then(cursos =>{
        res.render("tecnologia",{
            cursos : cursos

        });
    }); 
});

app.get("/gastronomia",(req,res) =>{
    

    Curso.findAll({
        where: {categoria : "gastronomia" }
    }).then(cursos =>{
        res.render("gastronomia",{
            cursos : cursos

        });
    }); 
});

 


/**
 *  envia para rota salvar cadastro
 * aluno.model e o modelo js
 * que representa a tabela do bd
 * 
 */
app.post("/salvarcadastro",(req,res) =>{
   var nome = req.body.nome;
   var email = req.body.email;
   var tel = req.body.tel;
   var senha = req.body.senha;
   var logado = req.body.logado;
   
   // res.send("nome: "+nome + " email: "+ email + " fone: " + tel);

   AlunoModel.create({
    nome: nome,
    email : email,
    tel:  tel,
    senha :senha,
    
    }).then(() =>{
        console.log(logado)
        res.redirect("cursoEscolhido/23");  
    });  
});

app.post("/responder",(req,res) =>{
    var corpo = req.body.corpo;
    var cursoid = req.body.curso;

    
    // res.send("nome: "+nome + " email: "+ email + " fone: " + tel);
 
    Comentario.create({
     corpo: corpo,
      cursoid: cursoid
     
     
     }).then(() =>{
         
        res.redirect("/cursoEscolhido/"+cursoid);  
     });  
 });


 app.get("/responder2", (req, res) => {
    res.json({message: 'teste'});
 })

const doc = new jsPDF();



app.listen(8000,()=>{
    console.log("servidor iniciado");});

