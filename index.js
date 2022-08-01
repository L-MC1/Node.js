const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'node_app',
    multipleStatements: true
});

mysqlConnection.connect((err)=>{
    if(!err)
    console.log('conectado');
    else
    console.log('não foi possivel conectar \n Error: '+JSON.stringify(err, undefined, 2));
});

app.listen(3000,()=>console.log('Express server is runnig na porta: 3000'));

// listagem de todos os dados em persons no console.log terminal. fazer request na rota
app.get('/curso_exp',(req,res)=>{
    mysqlConnection.query('SELECT * FROM persons',(err, rows, fields)=>{
        if (!err)
        res.send(rows);
        else
        console.log(err);
    })
});

// DELETE a pessoa pelo id
app.delete('/curso_exp/:id',(req,res)=>{
    mysqlConnection.query('DELETE * FROM persons WHERE ID = ?',[req.params.id],(err, rows, fields)=>{
        if (!err)
        res.send('Usuario deletado');
        else
        console.log(err);
    })
});

// GET pegar pessoa pelo id
app.get('/curso_exp/:id',(req,res)=>{
    mysqlConnection.query('SELECT * FROM persons WHERE ID = ?',[req.params.id],(err, rows, fields)=>{
        if (!err)
        res.send(rows);
        else
        console.log(err);
    })
});

// CREATE salvar pessoa no banco
app.post('/curso_exp/salvar',(req,res)=>{
    let person = req.body;
    var sql = "SET @ID = ?; SET @user_name = ?;SET @exp = ?;CALL salvar(@ID,@user_name,@exp);";
    mysqlConnection.query(sql,[person.ID,person.user_name,person.exp],(err, rows, fields)=>{
        if (!err)
        rows.forEach(element => {
            if(element.constructor == Array)
            res.send('Pessoa registrada id: '+element[0].id);
        });
        else
        console.log(err);
    })
});

// UPDATE editar pessoa no banco
app.put('/curso_exp/editar',(req,res)=>{
    let person = req.body;
    var sql = "SET @ID = ?; SET @user_name = ?;SET @exp = ?;CALL salvar(@ID,@user_name,@exp);";
    mysqlConnection.query(sql,[person.id,person.user,person.exp],(err, rows, fields)=>{
        if (!err)
        rows.forEach(element => {
            if(element.constructor == Array)
            res.send('Pessoa Atualizada id: '+element[0].id);
        });
        else
        console.log(err);
    })
});