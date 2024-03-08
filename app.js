const express = require('express');
const path = require('path');
const cookies = require('cookie-parser');
const DB = require('./collaboration/DB/Database');
const Gender = require('./routers/Gender');
const Wishes = require('./routers/Wishes');
const Bought = require('./routers/Bought');
const Grancvel = require('./routers/Grancvel');
const JWT = require('jsonwebtoken');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/gender', express.static(path.join(__dirname, 'public')));
app.use('/grancvel', express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookies());

app.get('/', async (req, res) => {
    const productsSQL = await DB.query('select * from products');
    const getUser = req.cookies.token !== undefined ? await JWT.verify(req.cookies.token, process.env.JWT_SECRET_KEY) : undefined;
    req.cookies.aaa = 'bbb';
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

    const wishes = await DB.query('select * from wishes where product_user_id = ?', [getUser ? getUser.id : undefined]);
    const bought = await DB.query('select * from bought where product_user_id = ?', [getUser ? getUser.id : undefined]);

    res.render('index.ejs', { products, user: getUser, likesProducts: wishes[0], boughtProducts: bought[0] })
})

app.get('/home', async (req, res) => {
    const productsSQL = await DB.query('select * from products');
    const getUser = req.cookies.token !== undefined ? await JWT.verify(req.cookies.token, process.env.JWT_SECRET_KEY) : undefined;

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

    const wishes = await DB.query('select * from wishes where product_user_id = ?', [getUser ? getUser.id : undefined]);
    const bought = await DB.query('select * from bought where product_user_id = ?', [getUser ? getUser.id : undefined]);

    res.render('index.ejs', { products, user: getUser, likesProducts: wishes[0], boughtProducts: bought[0] })
})


app.use('/gender', Gender);


app.get('/gallery/:id', async (req, res) => {
    const productsSQL = await DB.query('select * from products where id = ?', [req.params.id]);
    const getUser = req.cookies.token !== undefined ? await JWT.verify(req.cookies.token, process.env.JWT_SECRET_KEY) : undefined;

    let product = productsSQL[0].map(product => {
        return {
            id: product.id,
            name: product.name,
            price: product.price,
            brand: product.brand,
            gender: product.gender,
            type: product.type,
            images: product.images.split(' ')
        }
    })
    const wishes = await DB.query('select * from wishes where product_user_id = ?', [getUser ? getUser.id : undefined]);
    const bought = await DB.query('select * from bought where product_user_id = ?', [getUser ? getUser.id : undefined]);

    res.render('gallery', {
        product: product[0],
        user: getUser,
        likesProducts: wishes[0],
        boughtProducts: bought[0]
    })
})

app.get('/logout', (req, res) => {
    res.clearCookie('token')
    res.redirect('/');
})

app.use('/wishes', Wishes);

app.use('/bought', Bought);

app.use('/grancvel', Grancvel)

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.log(`your port live in ${PORT}`)
})

//A.GU*=H#JkWt