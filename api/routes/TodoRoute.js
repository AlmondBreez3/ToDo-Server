const { Router } = require('express');
const { getToDo, saveToDo } = require('../controllers/TodoController');

const router = Router();

router.get('/todo', getToDo);
router.post('/save', saveToDo);

module.exports = router;
