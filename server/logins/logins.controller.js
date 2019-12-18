const express = require('express');
const router = express.Router();
const loginService = require('./login.service');

// routes
router.post('/add', add);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function add(req, res, next) {
    loginService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    loginService.getAll()
        .then(logins => res.json(logins))
        .catch(err => next(err));
}

function getById(req, res, next) {
    loginService.getById(req.params.id)
        .then(login => login ? res.json(login) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    loginService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    loginService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}