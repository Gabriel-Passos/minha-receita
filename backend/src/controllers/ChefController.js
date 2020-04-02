const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');

module.exports = {
  async index(request,response){
    const chefs = await connection('chefs').select('*');

    return response.json(chefs);
  },

  async create(request, response){
    const {nome, sobrenome, email, senha} = request.body;

    const id = generateUniqueId();

    await connection('chefs').insert({
      id,
      nome,
      sobrenome,
      email,
      senha,
    })
    return response.json({id});
  },

  async delete(request, response){
    const id = request.headers.authorization;

    const chef = await connection('chefs')
      .where('id', id)
      .select('id')
      .first();
    
    if(chef.id !== id){
      return response.status(401).json({ error: 'Operation not permited.'});
    }

    await connection('chefs').where('id', id).delete();

    return response.status(204).send();
  }
}