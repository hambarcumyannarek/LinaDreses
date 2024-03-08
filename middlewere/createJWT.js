const JWT = require('jsonwebtoken');
const DB = require('../collaboration/DB/Database.js')

async function createJWT(req, res, next) {
    const { name, email } = req.userInfo;
    const [findUser] = await DB.query('select * from users where email = ?', [email]);
    const token = await JWT.sign({ id: findUser[0].id, name, email }, process.env.JWT_SECRET_KEY);
    res.cookie("token", token);
    console.log(req.cookies.token)
    res.redirect('/')
}

module.exports = createJWT;