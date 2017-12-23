const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');

//Connect the database to the app
require('./db/mongoose');

const app = express();
app.use(bodyParser.json());
//Helmet helps you secure your Express apps by
// setting various HTTP headers. It's not a silver bullet, but it can help!
app.use(helmet());
app.use(morgan('dev'));
const post = require('../routes/post')
const user = require('../routes/user')
    //const comment = require('../routes/comments')
app.use('/posts', post);
app.use('/user', user);
//app.use('/comment', comment);


//catch 404 Errors and forward them to error handeler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//Error handler funciton
app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err : {};
    const status = err.status || 500;
    //Respond to  client 
    res.status(status).json({
        error: {
            message: error.message
        }
    });
});



//start  the server 
const port = process.env.port || 3000;
app.listen(port, () => console.log(`Magic is happeing on port ${port}`))