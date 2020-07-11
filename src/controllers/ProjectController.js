const db = require('../database');
const { where } = require('../database');

module.exports = {
  async index(req, res) {
    try {

      const results =  await db('projects as p')
      .orderBy('p.id', 'desc')
      .where({'deleted_at': null})
      .leftJoin('users as u', 'u.id', '=', 'p.user_id')
      .select('p.id', 'p.title', 'u.username');

    return res.json(results);

    } catch (error) {

      return res.json(error);

    }
  },
  async show(req, res) {
    try {

      const {user_id} = req.params;

      const projects =  await db('projects as p')
      .where({'p.user_id': user_id, 'u.deleted_at': null})
      .orderBy('p.id', 'desc')
      .leftJoin('users as u', 'u.id', '=', 'p.user_id')
      .select('p.id', 'p.title');

    if (projects.length === 0) {
      return res.status(400).json({error: 'projeto não encontrado'});
    }

    return res.json(projects);

    } catch (error) {

      return res.json(error);

    }
  },
  async store(req, res) {
    try {

      const {title} = req.body;
      const {user_id} = req.params;

      const users =  await db('users')
      .where({'id': user_id, 'deleted_at': null})

      if (users.length === 0) {
        return res.status(400).json({error: 'usuário não encontrado'});
      }

      await db('projects').insert({
        title,
        user_id
      });
  
      return res.status(201).send();
      
    } catch (error) {
      return res.json(error)
    }
  }
}