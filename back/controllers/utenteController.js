const utenteModel = require('../models/utenteModel');

const todosUtentes = async (req, res) => {
  const utentes = await utenteModel.todosUtentes();
  return res.status(200).json(utentes.rows);
};

const nomeUtente = async (req, res) => {
  const utente = await utenteModel.nomeUtente();
  return res.status(200).json(utente);
};


module.exports = {
    todosUtentes,
    nomeUtente,
}