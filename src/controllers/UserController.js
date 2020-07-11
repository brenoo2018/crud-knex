const knex = require("../database")

const db = require('../database');

module.exports = {
  async index(req, res) {
    const results =  await db('users');
    return res.json(results);
  }
}