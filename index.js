//Basic Import Section
const express=require('express');
const app=express();

//Modular imports
const {showUsers} = require('./db/dbuser');
const {showUsersId} = require('./db/dbuser');
const {registerUser} = require('./db/dbuser');
const {deleteUser} = require('./db/dbuser');
const {modifyUser} = require('./db/dbuser');
const {loginUser} = require('./db/dbuser');

//Middleware
app.use(express.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST,PUT,DELETE,OPTIONS");
    next();
});


//db connection
const dbconnect = require('./config/dbconnect');
dbconnect();

//ACTIONS

//user actions
app.get('/user/showAll', showUsers);
app.get('/user/id/:userId', showUsersId);
app.post('/user/register', registerUser);
app.post('/user/login', loginUser);
app.delete('/user/delete', deleteUser);
app.put('/user/modify', modifyUser);

//film actions

//order actions

//port listen
app.listen(3000, ()=> console.log('>>>SERVER ONLINE'));