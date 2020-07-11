const knex = require("../database")

const db = require('../database');

module.exports = {
  async index(req, res) {

    try {

      const {page = 1} = req.query;

      const results =  await db('users')
      .limit(5)
      .offset((page - 1) * 5)
      .where({deleted_at: null})
      .orderBy('id', 'desc')
      .select('id', 'username', 'created_at');

      const [count] = await db('users').count();

      res.header('X-Total-Count', count['count']);

      return res.json(results);

    } catch (error) {

      return res.json(error);

    }

  },
  async create(req, res) {

    try {
      
    const {username} = req.body;

    const users =  await db('users')
    .where({'username': username})

    if (users.length > 0) {
      return res.status(400).json({error: 'usuário já existente'});
    }
    
    await db('users').insert({
      username
    });

    return res.status(201).send();

    } catch (error) {
      res.json(error)
    }
  },
  async update(req, res) {
    try {

      const {id} = req.params;
      const {username} = req.body;

      const users =  await db('users')
      .where({'id': id, 'deleted_at': null})

      if (users.length === 0) {
        return res.status(400).json({error: 'usuário não encontrado'});
      }

      await db('users')
      .update({username})
      .where({id});

      return res.send();


    } catch (error) {
      return res.json(error)
    }
  },
  async delete(req, res) {
    try {

      const {id} = req.params;

      const users =  await db('users')
      .where({'id': id, 'deleted_at': null})

      if (users.length === 0) {
        return res.status(400).json({error: 'usuário não encontrado'});
      }

      await db('users')
      .where({id})
      //.del()
      .update('deleted_at', new Date());

      return res.send()

    } catch (error) {
      return res.json(error)
    }
  }
}