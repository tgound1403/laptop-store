const User = require('../models/userModel');

const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.getUser(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const signup = async (req, res) => {
    const { username, password, phoneNumber, email } = req.body;
    try {
        const user = await User.signup(username, password, phoneNumber, email);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.login(username, password);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, password, phoneNumber, email } = req.body;
        const data = await User.updateUserAccount(id, username, password, phoneNumber, email);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getUser,
    signup,
    login,
    update,
};
