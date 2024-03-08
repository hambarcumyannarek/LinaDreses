
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const DB = require('../collaboration/DB/Database');
const JWT = require('jsonwebtoken');

// const products = fs.readFileSync(path.resolve('data.json'), 'utf-8');

router.get('/men', async (req, res) => {
    const productsSQL = await DB.query('select * from products where gender = "txa"');
    const getUser = req.cookies.token !== undefined ? await JWT.verify(req.cookies.token, process.env.JWT_SECRET_KEY) : undefined;
    const wishes = await DB.query('select product_id from wishes where product_user_id = ?;', [getUser ? getUser.id : undefined]);
    const bought = await DB.query('select * from bought where product_user_id = ?', [getUser ? getUser.id : undefined]);

    let products = productsSQL[0].map(product => {
        return {
            id: product.id,
            name: product.name,
            price: product.price,
            brand: product.brand,
            gender: product.gender,
            type: product.type,
            image: product.images.split(' ')[0]
        }
    })
    res.render('gender', {
        products,
        user: getUser,
        likesProducts: wishes[0],
        boughtProducts: bought[0],
        img: './images/store-906722.jpg',
        title: 'This Is A Man Page',
        page: 'men',
        types: [
            'allProduct',
            'T-Shirt',
            'trainers',
            'bag'
        ]
    })
})


router.get('/women', async (req, res) => {
    const productsSQL = await DB.query('select * from products where gender = "axchik"');
    const getUser = req.cookies.token !== undefined ? await JWT.verify(req.cookies.token, process.env.JWT_SECRET_KEY) : undefined;
    const wishes = await DB.query('select product_id from wishes where product_user_id = ?;', [getUser ? getUser.id : undefined]);
    const bought = await DB.query('select * from bought where product_user_id = ?', [getUser ? getUser.id : undefined]);

    let products = productsSQL[0].map(product => {
        return {
            id: product.id,
            name: product.name,
            price: product.price,
            brand: product.brand,
            gender: product.gender,
            type: product.type,
            image: product.images.split(' ')[0]
        }
    })

    res.render('gender', {
        products,
        user: getUser,
        likesProducts: wishes[0],
        boughtProducts: bought[0],
        img: './images/woman-2564660_1920.jpg',
        title: 'This Is A Woman Page',
        page: 'woman',
        types: [
            'allProduct',
            'dress',
            'shose',
            'skirt',
            'bag',
            'coat'
        ]
    })
})


module.exports = router;