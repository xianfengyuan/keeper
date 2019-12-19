const config = require('config.json');
const db = require('../_helpers/db');
const Login = db.Login;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Login.find();
}

async function getById(id) {
    return await Login.findById(id);
}

async function create(loginParam) {
    // validate
    if (await Login.findOne({ comments: loginParam.comments })) {
        throw 'comments "' + loginParam.comments + '" is already taken';
    }

    const login = new Login(loginParam);
    // save user
    await login.save();
}

async function update(id, loginParam) {
    const login = await Login.findById(id);

    // validate
    if (!login) throw 'Login not found';
    if (login.username !== loginParam.username && await Login.findOne({ comments: loginParam.comments })) {
        throw 'Comments "' + loginParam.comments + '" is already taken';
    }

    // copy loginParam properties to user
    Object.assign(login, loginParam);

    await login.save();
}

async function _delete(id) {
    await Login.findByIdAndRemove(id);
}