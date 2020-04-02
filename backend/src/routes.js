const express = require('express');
const {celebrate, Segments, Joi} = require('celebrate');

const ChefController = require('../src/controllers/ChefController');
const ReceitaController = require('../src/controllers/ReceitaController');

const routes = express.Router();

routes.get('/chefs', ChefController.index);

routes.post('/chefs', celebrate({
  [Segments.BODY]: Joi.object().keys({
    nome: Joi.string().required(),
    sobrenome: Joi.string().required(),
    email: Joi.string().required().email(),
    senha: Joi.string().required(),
  })
}), ChefController.create);

routes.delete('/chefs/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  })
}), ChefController.delete);

routes.get('/receitas', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
  })
}), ReceitaController.index);

routes.post('/receitas', celebrate({
  [Segments.BODY]: Joi.object().keys({
    nomeReceita: Joi.string().required(),
    ingredientes: Joi.string().required(),
    preparo: Joi.string().required(),
    porcao: Joi.number().required(),
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
}), ReceitaController.create);

routes.delete('/receitas/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  })
}), ReceitaController.delete);

module.exports = routes;