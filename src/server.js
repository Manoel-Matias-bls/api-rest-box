const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');


const app = express();

app.use(cors());


const server = require('http').Server(app);
const io = require('socket.io')(server);
//socket.io é o que vai possilitar atuação em real-time

//io é como se fosse as rotas do http
//função para criar "salas", para evitar que certos usuários 
//tenham acesso a dados que não deveriam ter
io.on("connection", socket =>{
    socket.on("connectRoom", box =>{
        socket.join(box);
    })
});

mongoose.connect(
    "mongodb+srv://omnitstack:Aa112131@cluster0-6ddmd.mongodb.net/omnistack?retryWrites=true",
    {
        useNewUrlParser: true
    }
);

//middleware global
app.use((req, res, next) => {
    req.io = io;

    return next();
});

//Importa módulo, no caso de json 
app.use(express.json());
//para envio de arquivos
app.use(express.urlencoded({extended: true}));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

//importando arquivo de rotas
app.use(require('./routes'));

//determina qual porta possibilitará acesso à aplicação no localhost
server.listen(process.env.PORT || 3334);