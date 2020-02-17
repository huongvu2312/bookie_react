const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const autoIncrement = require('mongoose-auto-increment');

/* create express port */
const app = express();
const port = process.env.PORT || 5000;

/* create middleware */
app.use(cors());
app.use(express.json());

/* connect to mongoDB */
const url = 'mongodb://127.0.0.1:27017/bookie';

mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
autoIncrement.initialize(connection);
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

/* set route for backend */
const finishedBookRouter = require('./router/finishedBooks');
const userRouter = require('./router/users');

app.use('/finishedBooks', finishedBookRouter);
app.use('/users', userRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});