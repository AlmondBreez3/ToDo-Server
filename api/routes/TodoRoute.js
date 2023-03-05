const express = require('express');
const router = express.Router();
const { getToDo, saveToDo } = require('../controllers/TodoController');

router.get('/comment', getToDo);
router.post('/addComment', saveToDo);

module.exports = router;
