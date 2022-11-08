const express = require('express');
const createError = require('http-errors');
const mongoose = require('mongoose');
path = require('path');
cors = require('cors');
bodyParser = require('body-parser');
dbConfig = require('./db/database');

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true
}).then(() => {
    console.log('Database connected')
},
    error => {
        console.log('Database could not be connected ' + error)
    })

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cors());
app.all('/*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Method', 'GET, PUT, POST, DELETE, OPTIONS, PATCH');
    res.header('Access-Control-Allow-Header', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
})

const arztRouter = require('./routes/doctor.routes');
const userRouter = require('./routes/user.routes');

app.use('/admin', arztRouter);
app.use('/user', userRouter);// /api than use userRouter (the Router)

const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
    console.log('Port connected to: ' + port)
})

app.use((req, res, next) => {
    next(createError(404));
})

app.get('/', (req, res) => {
    res.send('invalid admin');
});

app.use(function (err, req, res, next) {
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
})