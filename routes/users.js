var express = require('express');
var router = express.Router();

const TaskController= require('../controllers/taskcontrollers');

router.post('/', TaskController.store);
router.get('/tareas', TaskController.getTareas);
router.get('/buscar/:id', TaskController.buscar);
router.delete('/delete/:id', TaskController.delete);
router.put('/actualizar/:id',TaskController.update);



module.exports = router;
