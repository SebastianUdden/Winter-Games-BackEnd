/* eslint-disable no-console */
////////////////
// Setup
////////////////////////////////////////////////////////////////////////////////
var express = require('express');
var path = require('path');
var open = require('open');
var port = process.env.PORT || 3000;
var app = express();
var apiRoutes = express.Router(); 

var bodyParser = require('body-parser');
// var logger = require('./logger');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(logger);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*'); //<-- you can change this with a specific url like https://sebastianudden.github.io/Winter-Games or http://localhost:4200
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

////////////////
// Mongoose
////////////////////////////////////////////////////////////////////////////////
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var connectionString = 'mongodb://Zebudden:f4rs1ght@users-shard-00-00-pulnv.mongodb.net:27017,users-shard-00-01-pulnv.mongodb.net:27017,users-shard-00-02-pulnv.mongodb.net:27017/user?ssl=true&replicaSet=Users-shard-0&authSource=admin';
mongoose.connect(connectionString, function (err) {    
    if (err) throw err;    
    console.log('Successfully connected');    
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
    console.log('\n////////////////////////////////////////////////////////////////////////////////');
    console.log('//////////////////// Connection established with ' + db.name + '! /////////////////////////');
    console.log('////////////////////////////////////////////////////////////////////////////////\n\n');
});

//////////////
// Users
//////////////////////////////////////////////////////////////////////////////
var userSchema = mongoose.Schema({
    id: { type: Number },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    score: { type: Number },
    wallet: { type: Number },
    playthroughs: { type: Number },
    attributes: { type: Array },
    level: { type: String },
    current: { type: Boolean },
    admin: { type: Boolean },
    nextLeech: { type: Number }
});
var User = mongoose.model('User', userSchema);

User.find(function (err, users) {
    if (err) return console.error(err);
    users.forEach(user => {
        console.log(user.username + ', ' + user.score);
        console.log(user);
    });
    // console.log(users);
});


////////////////////
// JSON Web Tokens
////////////////////////////////////////////////////////////////////////////////
// var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
// var config = {
//     'secret': 'ILOVEWINTERGAM3S'
// };
// app.set('superSecret', config.secret); // secret variable

///////////
// Morgan
////////////////////////////////////////////////////////////////////////////////
var morgan      = require('morgan');
app.use(morgan('dev'));

//////////////
// API Calls
////////////////////////////////////////////////////////////////////////////////
apiRoutes.get('/', function(req, res) {    
    res.redirect('/users');
    // res.send('Hello Universe!');
    // res.sendFile(path.join(__dirname, '/public/index.html'));
});
apiRoutes.get('/users', function(req, res) {    
    User.find(function (err, users) {
        if (err) { return res.send(err); }
        res.send(users);
    });
});
apiRoutes.get('/users/:username', function(req, res) {    
    User.findOne({ username: req.params.username}, function(err, user) {
        if (err) { res.send(err); }
        res.json(user);
    });
});
apiRoutes.post('/users', function(req, res) {
    User.create(req.body, function(err, user) {
        if (err) { res.send(err); }
        res.json(user);
        console.log(user);
    });
});
apiRoutes.put('/users/:username', function(req, res) {
    User.findOneAndUpdate({ username: req.params.username }, { $set: req.body }, {new: true}, function(err, user) {
        if (err) { res.send(err); }
        res.json(user);
        console.log(user);
    });
});
apiRoutes.delete('/users/:username', function(req, res) {
    User.remove({
        username: req.params.username
    }, function(err, task) {
    if (err) { res.send(err); }
        res.json({ message: 'User ' + req.params.username + ' successfully deleted' });
    });
});

////////////////
// Listen
///////////////////////////////////////////////////////////////////////////////
app.use('/api', apiRoutes);
app.listen(port, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('\nListening on port ' + port + '...');
        // open('http://localhost:' + port);
    }
});









///////////////////
// Authentication
////////////////////////////////////////////////////////////////////////////////
// apiRoutes.post('/authenticate', function(req, res) {
//     // find the user
//     User.findOne({
//         userName: req.body.userName
//     }, function(err, user) {
//         if (err) { throw err; }

//         if (!user) {
//             res.json({ success: false, message: 'Authentication failed. User not found.' });
//         } else if (user) {
//             // check if password matches
//             if (user.password != req.body.password) {
//                 res.json({ success: false, message: 'Authentication failed. Wrong password.' });
//             } else {                
//                 // if user is found and password is right
//                 // create a token with only our given payload
//                 // we don't want to pass in the entire user since that has the password
//                 const payload = {
//                     admin: user.admin 
//                 };
                
//                 var token = jwt.sign(payload, app.get('superSecret'), {
//                     expiresIn : 60*60*24 // expires in 24 hours
//                 });

//                 // return the information including token as JSON
//                 res.json({
//                     success: true,
//                     message: 'Enjoy your token!',
//                     token: token
//                 });
//             }   
//         }
//     });
// });

// // route middleware to verify a token
// apiRoutes.use(function(req, res, next) {
//     // check header or url parameters or post parameters for token
//     var token = req.body.token || req.query.token || req.headers['x-access-token'];

//     // decode token
//     if (token) {
//         // verifies secret and checks exp
//         jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
//             if (err) {
//                 return res.json({ success: false, message: 'Failed to authenticate token.' });    
//             } else {
//                 // if everything is good, save to request for use in other routes
//                 req.decoded = decoded;    
//                 next();
//             }
//         });
//     } else {
//         // if there is no token
//         // return an error
//         return res.status(403).send({ 
//             success: false, 
//             message: 'No token provided.' 
//         });
//     }
// });