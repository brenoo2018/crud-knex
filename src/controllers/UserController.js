const knex = require("../database")

const db = require('../database');

module.exports = {
  async index(req, res) {

    try {

      const results =  await db('users')
      .orderBy('id', 'desc')
      .select('id', 'username', 'created_at');

    return res.json(results);

    } catch (error) {

      return res.json(error);

    }

  },
  async create(req, res) {

    try {
      
    const {username} = req.body;
    
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

      await db('users')
      .where({id})
      .del();

      return res.send()

    } catch (error) {
      return res.json(error)
    }
  }
}