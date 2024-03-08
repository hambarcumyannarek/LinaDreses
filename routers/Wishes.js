
const express = require('express');
const router = express.Router();
const fs = require('fs/promises');
const path = require('path');
const Auth = require('../middlewere/auth');
const DB = require('../collaboration/DB/Database');

router.get('/', Auth, async (req, res) => {
    const productsSQL = await DB.query('select product_user_id, product_id, name, price, brand, gender, type, images from wishes inner join products on products.id = wishes.product_id where product_user_id = ?;', [req.user.id]);
    // const likeProducts = JSON.parse(data);
    let products = productsSQL[0].map(product => {
        return {
            id: product.product_id,
            name: product.name,
            price: product.price,
            brand: product.brand,
            gender: product.gender,
            type: product.type,
            image: product.images.split(' ')[0]
        }
    })
    const wishes = await DB.query('select * from wishes where product_user_id = ?', [req.user.id]);
    const bought = await DB.query('select * from bought where product_user_id = ?', [req.user.id]);

    res.render('wishes.ejs', { products, wishesLength: wishes[0].length, boughtProducts: bought[0], user: req.user });
})

router.post('/', Auth, async (req, res) => {
    const { userId, productId } = req.body;
    const findUser = await DB.query('select * from wishes where product_id = ? and product_user_id = ?;', [productId, req.user.id]);
    if (findUser[0].length === 0) {
        await DB.query('insert into wishes(product_user_id, product_id) values(?,?)', [userId, productId]);

        res.send();
    }
})

router.delete('/', Auth, async (req, res) => {
    const { userId, productId } = req.body;
    await DB.query(`delete from wishes where product_user_id = ${userId} and product_id  = ${productId}`);

    res.send();
})

module.exports = router;
