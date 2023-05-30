const express = require('express');
const dotenv = require('dotenv');

dotenv.config({path: '.env'});
const PORT = process.env.PORT || 3001;

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const config = require('./config/auth.conf');

const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'DELETE']
};

/* ROUTE IMPORT */
const products = require('./routes/product');
const baskets = require('./routes/basket');
const users = require('./routes/user');
const sessions = require('./routes/session');

const app = express();

/* MIDDLEWARE */
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session(config));
app.use(cookieParser(null, {
    sameSite: 'strict'
}));


/* API */
app.get('/', (req, res) => {
    res.status(200).send("Le site web pour les abonnements des tuyaux informatiques!");
});

app.use('/products', products);
app.use('/baskets', baskets);
app.use('/users', users);
app.use('/sessions', sessions);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});