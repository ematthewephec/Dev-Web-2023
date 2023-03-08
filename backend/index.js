const express = require('express');
const PORT = process.env.PORT || 3000;

/* ROUTE IMPORT */
const products = require('./routes/product');

const app = express();

/* API */
app.get('/', (req, res) => {
    res.status(200).send("Hello! This is the API!");
});

app.use('/products', products);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});