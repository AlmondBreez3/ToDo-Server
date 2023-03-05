const jwt = require('jsonwebtoken');
const jwtSecret = 'ohtruhjfgjndfjkgnkjnksgf';
const ToDo = require('../models/TodoModel');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: 'true' }));
app.use(bodyParser.json());

module.exports.saveToDo = async (req, res) => {
  const token = req.headers.authorization.split('Bearer ')[1];
  console.log('token:', token);
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const todo = await ToDo.create({
      owner: userData.id,
      todos: req.body.todos,
    });
    await todo.save();
    res.json(todo);
  });
};

module.exports.getToDo = async (req, res) => {
  const token = req.headers.authorization.split('Bearer ')[1];
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const { id } = userData;
    res.json(await ToDo.find({ owner: id }));
  });
};
