const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();

/* API */
app.get('/', (req, res) => {
    res.status(200).json({message: "Hello! This is the API!"});
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});