const connection = require('../database/connection');

module.exports = {
  async index(request,response){
    const {page = 1} = request.query;

    const [count] = await connection('receitas').count();

    const receitas = await connection('receitas')
      .join('chefs', 'chefs.id', '=', 'receitas.receita_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'receitas.*',
        'chefs.nome',
        'chefs.sobrenome',
        'chefs.email',
        'chefs.senha',
      ]);
      response.header('X-Total-Count', count['count(*)']);
      return response.json(receitas);
  },

  async create(request, response){
    const {nomeReceita, ingredientes, preparo, porcao} = request.body;
    const receita_id = request.headers.authorization;

    const [id] = await connection('receitas').insert({
      nomeReceita,
      ingredientes,
      preparo,
      porcao,
      receita_id,
    });
    return response.json({id});
  },

  async delete(request, response){
    const {id} = request.params;
    const receita_id = request.headers.authorization;

    const receita = await connection('receitas')
      .where('id', id)
      .select('receita_id')
      .first()
    
    if(receita.receita_id !== receita_id){
      return response.status(401).json({error: 'Operation not permited.'});
    }

    await connection('receitas').where('id', id).delete();

    return response.status(204).send();
  }
}