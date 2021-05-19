const Favorite = require('../models/Favorite');
const User = require('../models/User');

module.exports = {
    async index(request, response) {
        const { id } = request.params;

        if(!id){
          return response.json({ message: 'Dados invalidos!' });
        }

        const dataValues = await Favorite.findAll({
          where: {
            user_id: id,
          }
        });


        if(!dataValues){
          return response.json({ message: 'Sem pesquisas salvas!' });
        }

        return response.json(dataValues);
    },

    async create(request, response) {
        const { name, language, description, html_url, username } = request.body;

        const dataValues = await User.findOne({
          where: {
            username,
          }
        });

        if(!dataValues){
            return response.json({ message: 'Usuario nao cadastrado!' });
        }

        const repoExists = await Favorite.findOne({
          where: {
            repo_url: html_url,
          }
        });

        if(repoExists){
            return response.json({ message: 'Repositório já está salvo!' });
        }

        try {
          await Favorite.create({
            repo_name: name,
            repo_url: html_url,
            repo_description: description,
            repo_language: language,
            user_id: dataValues.id
          });

        } catch(err) {
          return response.status(400).json(err);
        }
        
        return response.json({ message: 'Busca salva!' });
    }
}