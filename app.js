/* eslint-disable no-console */
////////////////
// Setup
////////////////////////////////////////////////////////////////////////////////
var express = require('express');
var path = require('path');
var open = require('open');
var port = process.env.PORT || 3000;
var app = express();

var bodyParser = require('body-parser');
var logger = require('./logger');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger);

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
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    score: { type: Number },
    level: { type: String },
    current: { type: Boolean }
});
var User = mongoose.model('User', userSchema);

User.find(function (err, users) {
    if (err) return console.error(err);
    users.forEach(user => {
        console.log(user.userName + ', ' + user.score);
    });
    // console.log(users);
});

app.get('/', function(req, res) {    
    res.redirect('/users');
    // res.send('Hello Universe!');
    // res.sendFile(path.join(__dirname, '/public/index.html'));
});
app.get('/users', function(req, res) {    
    User.find(function (err, users) {
        if (err) { return res.send(err); }
        res.send(users);
    });
});
app.get('/users/:username', function(req, res) {    
    User.findOne({ userName: req.params.username}, function(err, user) {
        if (err) { res.send(err); }
        res.json(user);
    });
});

app.post('/users', function(req, res) {
    User.create(req.body, function(err, user) {
        if (err) { res.send(err); }
        res.json(user);
        console.log(user);
    });
});

app.put('/users/:username', function(req, res) {
    User.findOneAndUpdate({ userName: req.params.username },  req.body, {new: true}, function(err, user) {
        if (err) { res.send(err); }
        res.json(user);
        console.log(user);
    });
});

app.delete('/users/:username', function(req, res) {
    User.remove({
        userName: req.params.username
    }, function(err, task) {
    if (err) { res.send(err); }
        res.json({ message: 'User successfully deleted' });
    });
});

////////////////
// Listen
///////////////////////////////////////////////////////////////////////////////
app.listen(port, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('\nListening on port ' + port + '...');
        // open('http://localhost:' + port);
    }
});
