//Basic Import Section
const express=require('express');
const app=express();

//Modular imports
const {showUsers} = require('./db/dbuser');
const {showUsersId} = require('./db/dbuser');
const {registerUser} = require('./db/dbuser');
const {deleteUser} = require('./db/dbuser');
const {modifyUser} = require('./db/dbuser');

//Middleware
app.use(express.json());



//db connection
const dbconnect = require('./config/dbconnect');
dbconnect();

//ACTIONS

//user actions
app.get('/user/showAll', showUsers);
app.get('/user/id/:userId', showUsersId);
app.post('/user/register', registerUser);
app.delete('/user/delete', deleteUser);
app.put('/user/modify', modifyUser);


//port listen
app.listen(3000, ()=> console.log('>>>SERVER ONLINE'));