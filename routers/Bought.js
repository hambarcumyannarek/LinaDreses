
const express = require('express');
const router = express.Router();
const fs = require('fs/promises');
const Auth = require('../middlewere/auth');
const DB = require('../collaboration/DB/Database');

router.get('/', Auth, async (req, res) => {
    const productsSQL = await DB.query('select product_user_id, product_id, count, name, price, brand, images from bought inner join products on products.id = bought.product_id where product_user_id = ?;', [req.user.id]);
    let products = productsSQL[0].map(product => {
        return {
            id: product.product_id,
            name: product.name,
            price: product.price,
            brand: product.brand,
            count: product.count,
            image: product.images.split(' ')[0]
        }
    })
    const bought = await DB.query('select * from bought where product_user_id = ?', [req.user.id]);
    const wishes = await DB.query('select * from wishes where product_user_id = ?', [req.user.id]);
    const boughtAllCount = await DB.query('select sum(count) from bought where product_user_id = ?', [req.user.id]);
    res.render('bought.ejs', { products, wishesLength: wishes[0].length, boughtLength: bought[0].length, boughtAllCount: boughtAllCount[0][0]['sum(count)'], user: req.user });
})


router.post('/', Auth, async (req, res) => {
    const { userId, productId } = req.body;
    const findUser = await DB.query('select * from bought where product_id = ? and product_user_id = ?;', [productId, req.user.id]);
    if (findUser[0].length === 0) {
        await DB.query('insert into bought(product_user_id, product_id, count) values(?,?,?)', [userId, productId, 1]);

        res.send();
    }
})

router.put('/', Auth, async (req, res) => {
    const { count, userId, productId } = req.body;
    await DB.query(`update bought set count = ${count} where product_id = ${productId} and product_user_id = ${userId}`);
    res.send();
})

router.delete('/', Auth, async (req, res) => {
    const { userId, productId } = req.body;
    await DB.query(`delete from bought where product_user_id = ${userId} and product_id  = ${productId}`);

    res.send();
})

module.exports = router;