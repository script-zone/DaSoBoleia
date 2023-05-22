const express = require('express');
const utenteController = require('../controllers/utenteController');

const router = express.Router();

router.get('/utentes', utenteController.todosUtentes);
router.get('/getUtente', utenteController.nomeUtente);

module.exports = router;

