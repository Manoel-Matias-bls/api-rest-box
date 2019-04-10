const Box = require('../models/Box');

class BoxController {
    //async await: para requisições assincronas no node
    //método store cria uma pasta para arquivos (Create do CRUD)
    async store (req, res){
        //persistindo daddos da GUI no BD
        const box = await Box.create(req.body);
        
        //resposta para frontend será em formato json
        return res.json(box);
    }

    //método para consulta (READ do CRUD)
    async show(req, res){
        const box = await Box.findById(req.params.id).populate({
            path: "files",
            options: {sort: {createdAt: -1}}
        });

        return res.json(box);
    }
}

//Deve-se exportar com new para exportar uma instância da classe e
// assim ter acesso aos métodos
module.exports = new BoxController();