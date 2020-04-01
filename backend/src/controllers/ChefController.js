const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');

module.exports = {
  async create(request, response){
    const {nome, sobrenome, email, senha} = request.body;

    const id = generateUniqueId();

    await connection('chefs').insert({
      id,
      name,
      sobrenome,
      email,
      senha,
    })
    return response.json({id});
  }
}