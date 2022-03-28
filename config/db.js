const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongooseURL');

const connectDB = async () => {
    try {
        console.log(db);
        await mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('DB Connected!');

    } catch (error) {
        console.log(error.message);
    }
}

module.exports = connectDB;