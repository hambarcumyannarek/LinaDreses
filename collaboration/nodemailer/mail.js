const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'linapetrosyan22@gmail.com',
        pass: 'wapk udrh xfli mkcs'
    },
    tls: {
        rejectUnauthorized: false
    }
});

module.exports = transporter;