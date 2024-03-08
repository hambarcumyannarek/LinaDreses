const express = require('express');
const router = express.Router();
const JWT = require('jsonwebtoken');
const DB = require('../collaboration/DB/Database');
const bcrypt = require('bcrypt');
const transporter = require('../collaboration/nodemailer/mail');
const createJWT = require("../middlewere/createJWT");


router.get('/register', isAtenticate, (req, res) => {
    res.render('register.ejs', {
        emailValid: true
    })
})


async function mailValidation(req, res, next) {
    const { email } = req.body;
    const thisUserEmail = await DB.query('select email from users where email = ?', [email])
    if (thisUserEmail[0].length !== 0) {
        return res.render('register.ejs', {
            emailValid: false
        });
    }
    next();
}
function isAtenticate(req, res, next) {
    if (req.cookies.token !== undefined) {
        return res.redirect('/');
    }

    next();
}

let OTP;
async function nodeMailer(req, res, next) {
    OTP = Math.floor(Math.random() * 9000) + 1000;

    const info = await transporter.sendMail({
        from: 'linadress22@gmail.com',
        to: req.body.email,
        subject: "This is your OTP ✔", // Subject line
        text: `${OTP}`, // plain text body
    })

    if (!info.messageId) {
        return res.status(404).send('we have a problem')
    }

    next();
}

let userInfo;
router.post('/register', mailValidation, nodeMailer, async (req, res) => {
    userInfo = req.body;
    res.redirect('/grancvel/verify');
})


router.get('/verify', (req, res, next) => {
    res.render('verify.ejs')
})

router.post('/verify', async (req, res, next) => {
    if (req.body.num.join('') != OTP) return res.status(404).send('Your OTP Faild');
    req.userInfo = userInfo;
    const { name, email, password } = req.userInfo;

    const hashPassword = await bcrypt.hash(password, 10);
    await DB.query('insert into users(name, email, password) values(?, ?, ?);', [name, email, hashPassword]);
    next();
}, createJWT)

router.get('/login', isAtenticate, (req, res) => {
    res.render('login.ejs',)
})

router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    const [findUser] = await DB.query('select * from users where email=?', [email]);

    if (findUser.length !== 0) {
        const passwordValid = await bcrypt.compare(password, findUser[0].password);

        if (passwordValid) {
            req.userInfo = { name: findUser[0].name, email: findUser[0].email };
            return next();
        }
    }
    res.render('login.ejs',)
}, createJWT)


module.exports = router;