const express = require ('express');
const bodyParser = require ('body-parser');
const fs = require ('fs');

const app = express();

app.use(express.static('.'));

app.use(bodyParser.json());

app.get('/catalogData', (req, res) => {
    fs.readFile('catalog.json', 'utf-8', (err, data) => {
        res.send(data);
    });
});

app.post ('/addToCart', (req, res) => {
    fs.readFile('cart.json', 'utf-8', (err,data) => {
        if (err) {
            res.send('{"result": 0}');
        } else {
            const cart = JSON.parse(data);
            const item = req.body;

            cart.push(item);

            fs.writeFile('cart.json', JSON.stringify(cart), (err) => {
                if (err) {
                    res.send ('{"result": 0}');
                } else {
                    res.send ('{"result": 1}');
                }
            });
        }
    });
});

app.get('/cartData', (req, res) => {
    fs.readFile('./cart.json', 'utf-8', (err, data) => {
        res.send(data);
    });
});


app.post ('/removeFromCart', (req, res) => {
    fs.readFile('./cart.json', 'utf-8', (err,data) => {
        if (err) {
            res.send('{"result": 0}');
            } 
            const cart = JSON.parse(data);
            const { product_name } = req.body;

            if(!product_name){
                res.send ('{"result": 0}');
            }
            const newCart = cart.filter(cartItem => cartItem.product_name != product_name)
            fs.writeFile('./cart.json', JSON.stringify(newCart), (err) => {
                if (err) {
                    res.send ('{"result": 0}');
                } else {
                    res.send ('{"result": 1}');
                }
            });
    });
});



app.listen(3000, function() {
    console.log('server is running on port 3000');
})