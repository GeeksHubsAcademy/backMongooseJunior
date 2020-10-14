const UserModel=require('../models/User');

const mongoose=require('mongoose');

const fs=require('fs');

const showUsers = (req, res) => {
     
    
        //we show all users
        UserModel.find({})
        .then(users=>{
            res.send(users)
        })
        .catch(error=>console.log(error))
    
}

const showUsersId = (req, res) => {
     
    let idDavid = req.params.userId;
    //we show all users
    UserModel.findOne({id:idDavid})
    .then(users=>{
        res.send(users)
    })
    .catch(error=>console.log(error))

}


module.exports = {
    showUsers,
    showUsersId
}