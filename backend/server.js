require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute');

//routes
app.use('/api/user', userRoute);
app.use('/api/product', productRoute);

// middlewares
app.use(express.static(path.join(__dirname, '../backend/uploads')));
console.log('use for uploads ' + path.join(__dirname, '../backend/uploads'));
app.use(express.json());

//connect to database and start server
mongoose.set('strictQuery', false);
mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`connected to database`);
            console.log(`listening on PORT ${process.env.PORT}...`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
