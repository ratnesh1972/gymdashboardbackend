const express = require('express');
const connectDB = require('./config/db');
const Member = require('./models/Member');
const cors = require('cors');
const PORT = process.env.PORT || 5000;

const app = express();

//Connect to DB.
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.send(`<h3>GYMDASHBOARD API SERVICE</h3>
    <br>
    <p>Routes -</p>
    <ul>
        <li>Get user - GET /users</li>
        <li>Users Signup- POST /users/signup</li>
        <li>Users Signin- POST /users/signin</li>
        <li>Get All Members - GET /members</li>
        <li>Add Member - POST /members</li>
        <li>Get Member - GET /members/id</li>
        <li>Update Member - PUT /members/id</li>
        <li>Delete Member - DELETE /members/id</li>
        <li>Get All Transactions - GET /transactions</li>
        <li>Update Transaction - PUT /transactions/id</li>
        <li>Delete Transaction - DELETE /transactions/id</li>
        <li>Transaction Details - GET /transactiondetails</li>
        <li>Add Trainer - POST /trainers</li>
        <li>Get Trainer - GET /trainers/id</li>
        <li>Update Trainer - PUT /trainers/id</li>
        <li>Delete Trainer - DELETE /trainers/id</li>
    </ul>
    `);
})

app.use('/users', require('./routes/users'));
app.use('/members', require('./routes/members'));
app.use('/transactions', require('./routes/transactions'));
app.use('/transactiondetails', require('./routes/transactionDetails'));
app.use('/trainers', require('./routes/trainers'));

app.listen(PORT, () => {
    console.log('Listening on port 5000');
})