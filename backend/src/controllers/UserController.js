const User = require('../models/User');

const bcrypt = require('bcrypt');

module.exports = {
    async create(request, response) {
        const { username, name, password } = request.body;

        const userExists = await User.findOne({
          where: {
            username,
          }
        });

        if(userExists){
            return response.json({ message: 'Usuário já existe!' });
        }

        const password_hash = await bcrypt.hash(password, 10);

        try {
          await User.create({username, name, password_hash});

        } catch(err) {
          return response.status(400).json(err);
        }
        
        return response.json({ message: 'Cadastro efetuado!' });
    },

    async login(request, response) {
      const { username, password } = request.body;

      if(!username || !password){
          return response.json({ message: 'Usuário ou senha incorretos!' });
      }

      const dataValues = await User.findOne({
          where: {
          username,
          }
      });

      if(!dataValues){
          return response.json({ message: 'Usuário ou senha incorretos!' });
      }

      if(! await bcrypt.compare(password, dataValues.password_hash)){
          return response.json({ message: 'Usuário ou senha incorretos!' });
      }

      const user = {
          id: dataValues.id,
          username: dataValues.username,
          name: dataValues.name,
      }

      return response.json(user);
  }
}