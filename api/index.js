const express = require('express');
const cors = require('cors');
require('dotenv').config();
const Transaction = require('./models/Transaction.js');
const { default: mongoose } = require("mongoose");
const app = express();

app.use(cors());
app.use(express.json());
app.get('/api/test', (_req,res) => {
    res.json('test ok2');
});

app.get('/', (req, res) => {
    res.send('Welcome to the MERN Backend!');
});

app.post('/api/transaction', async (req,res) => {
    await mongoose.connect(process.env.MONGO_URL);
    const {name,description,datetime,price} = req.body;
    const transaction = await Transaction.create({name,description,datetime,price});
    
    res.json(transaction);
});

app.get('/api/transactions', async (req,res) => {
    await mongoose.connect(process.env.MONGO_URL);
    const transactions = await Transaction.find();
    res.json(transactions);
})

const PORT = process.env.PORT || 4040;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
