let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let indexRouter = require('./routes/index');
// let usersRouter = require('./routes/users');
// let birdsRouter = require('./routes/birds');

let mapperRouter = require('./routes/mapper');
let dataProviderRouter = require('./routes/dataProvider');


let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// app.use('/', indexRouter);
app.use('/mapper', mapperRouter);
app.use('/dp', dataProviderRouter);

// app.use('/users', usersRouter);
// app.use('/birds', birdsRouter);

module.exports = app;
