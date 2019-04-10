const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const routes = express.Router();

const BoxController = require('./controllers/BoxController');
const FileController = require('./controllers/FileController');

routes.post("/boxes", BoxController.store);
routes.get("/boxes/:id", BoxController.show);
//single() pq será realizado o upload de um arquivo por vez
routes.post(
    "/boxes/:id/files", 
    multer(multerConfig).single('file'), 
    FileController.store
);


//req: variável tipo request, com dados de formulários,arrays, etc
//res: é a resposta oriunda do servidor para cliente
/*routes.get('/teste', (req, res)=> {
    return res.send('Hello World - React');
});
*/

//esta exportando variáveis, no caso para ser usada
//no arquivo server.js
module.exports = routes;