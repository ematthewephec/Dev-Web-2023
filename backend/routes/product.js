const express = require('express');
const router = express.Router();
const pool = require('../helpers/database');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', async (req, res) => {
  try {
    const productsQuery = 'SELECT * FROM products LEFT JOIN images ON images.ImageID = products.ProductImageID;';
    const rows = await pool.query(productsQuery);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { productName, productStock, productDesc, productPrice, productOnSale } = req.body;
    const image = req.file;
    console.log(image);

    // Effectuer des validations supplémentaires si nécessaire

    // Insérer m'image dans la table "Images"
    let imageID = null;
    if (image) {
      const imageQuery = 'INSERT INTO Images (ImageName, ImageSize, ImageType, ImageData) VALUES (?, ?, ?, ?)';
      const imageResult = await pool.query(imageQuery, [image.originalname, image.size, image.mimetype, image.buffer]);
      imageID = imageResult.insertId;
    }
    
    // Insérer les données dans la base de données
    const query = 'INSERT INTO Products (ProductName, ProductStock, ProductDesc, ProductPrice, ProductOnSale, ProductImageID) VALUES (?, ?, ?, ?, ?, ?)';
    await pool.query(query, [productName, productStock, productDesc, productPrice, productOnSale, imageID]);

    res.status(200).json({ message: 'Product added successfully' });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;