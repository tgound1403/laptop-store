const express = require('express');
const router = express.Router();
const {
    getAll,
    getUser,
    signup,
    login,
    updateAccount,
    updateRole,
    deleteUser,
} = require('../controllers/userController');

router.post('/signup', signup);

router.post('/login', login);

router.delete('/:id', deleteUser);

router.put('/:id', updateAccount);

router.get('/:id', getUser);

router.get('/', getAll);

module.exports = router;
