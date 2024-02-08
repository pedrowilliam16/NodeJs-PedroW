const express  = require('express')
const app =  express()
const port = 3000
const mysql = require ('mysql2')
const bodyParser = require('body-parser')
app.use(bodyParser.json())

const banco_de_dados =  mysql.createConnection ({
    host: 'localhost',
    user:  'root',
    password: 'c@tolic@',
    database: 'turma'
})


app.use (bodyParser.json())

app.get('/alunos', (req, res) => {
    banco_de_dados.query ('SELECT * FROM 3a', (err, results) => {
        if (err) {
            res.status(500).json({ erro: "Falha ao procurar usuarios", err})
        } else {
            res.json({Resultado: results})
        }
    })
} )

app.get('/alunos/:id', (req,res) => {
    const id = req.params.id
    banco_de_dados.query('SELECT * FROM 3a WHERE ID=?', [id], (err, results) => {
        if(err) {
            res.send('Erro ao consultar')
        } else {
            res.send(results)
        }
    })
})


banco_de_dados.connect((err) => {
    if (err) {
        console.log('Erro na conexão com MySql', err)
    } else {
        console.log('Conexão bem sucedida com MySql')
    }
})

app.listen(port, () => {
    console.log ('Seu servidor está no ar')
})

app.post('/alunos/criar', (req, res) => {
    const {aluno, idade} = req.body
    const values = [aluno, idade]

    banco_de_dados.query ('INSERT INTO 3a (aluno, idade) VALUES (?, ?)', values, (err, results) => {
        if (err) {
            res.send('erro ao inserir no Mysql')
        } else {
            res.send('Dados inseridos com sucesso')
        }
    })
})

app.delete('/alunos/delete/:id', (req, res) => {
    const id = req.params.id;

    banco_de_dados.query('DELETE FROM 3a WHERE ID=?', [id], (err, results) => {
        if (err) {
            res.status(500).json({ erro: "Falha ao deletar usuário", err });
        } else {
            res.json({ mensagem: "Usuário deletado com sucesso", resultado: results });
        }
    });
});

app.put('/alunos/alterar/:id', (req, res) => {
    const id = req.params.id;
    const { aluno } = req.body;
    const values = [aluno, id];

    banco_de_dados.query('UPDATE 3a SET aluno = ? WHERE ID = ?', values, (err, results) => {
        if (err) {
            res.send(`Erro ao alterar usuário: ${err}`);
        } else {
            res.send('Usuário alterado com sucesso');
        }
    });
});
