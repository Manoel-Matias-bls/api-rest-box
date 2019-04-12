const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

module.exports = {
    //dest: destino dos arquivos, tipo caminho da pasta 
    //o path padroniza caminhos de pastas, tipo windows (\), linux (/), etc
    dest: path.resolve(__dirname, '..', '..', 'tmp'),
    //deternina local especifico, disco local, nuvem, BD
    storage: multer.diskStorage({
        //cb: função que será chamada após determinar localização dos arquivos
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'tmp'));
        }, //filename vai evitar nomes duplicados
        filename: (req, file, cb) => {
            //vai gerar um hash com 16 caracteres (bytes)
            crypto.randomBytes(16, (err, hash) => {
                //em caso de erro, retorna ao cb acima
                if (err) cb(err);

                //do contrário cria o hash add hifen e o nome original
                //ex: asd897asd...-print.jpg
                file.key = `${hash.toString('hex')}-${file.originalname}`;

                cb(null, file.key);
            })
        }
    })
};