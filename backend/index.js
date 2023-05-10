const express = require('express');
const PORT = process.env.PORT || 3001;
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
dotenv.config({path: '.env'});

const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
};

/* ROUTE IMPORT */
const products = require('./routes/product');
const facture = require('./routes/facture');
const app = express();

/* MIDDLEWARE */
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

/* API */
app.get('/', (req, res) => {
    res.status(200).send("Le site web pour les abonnements des tuyaux informatiques!");
});

app.use('/products', products);
app.use('/facture', facture);
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
