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

const registerUser = async (req, res) => {
    
    let bodyData = req.body;
    let regExEmail = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/;
    let regExPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;


    if(!regExEmail.test(bodyData.email)){
        res.send({
            message: "El email introducido no es válido"
        });
        return;
    }

    if(!regExPassword.test(bodyData.password)){
        res.send({
            message: "El password introducido no es válido"
        });
        return;
    }

    //fin de comprobacion inicial de errores
    
    try {
		
        const user = await new UserModel({
		    username: bodyData.username,
		    email: bodyData.email,
		    password: bodyData.password
        }).save();

        res.send({
            message: "Account created successfully.",
            username: user.username
        });

        // const user = await new UserModel(
        //     req.body
        // ).save();
		
	} catch (err) {
        
        if (err.code === 11000) { // E11000 duplicate key error (unique true)
			
			res.status(409); // conflict
			res.send({
				error: "Email already used."
			});
			
		} else {
			
			res.send(err);
			
		}
			
		
	};
	
};

const deleteUser = async (req, res) => {
    
    let id = req.body.id;

	UserModel.findByIdAndDelete(
		id
	).then ( (borradoExitosamente) => {
		
		if (borradoExitosamente) {
			res.send({
				message: `User ${borradoExitosamente.id} borrado con éxito: Usuario: ${borradoExitosamente.username} email: ${borradoExitosamente.email}`
			});
		} else {
			res.status(404);
			res.send({
				error: `Usuario con el id ${id} no encontrado.`
			})
		};
		
	}).catch( (err) => {
		console.log( err );
	});
}

const modifyUser = async (req, res) => {
    UserModel.findByIdAndUpdate(req.body.id,
        {username: req.body.username, password: req.body.password}, {new:true, useFindAndModify:false})
    .then( (user) => {

        if(user){

            if(user){
                //then positively user was found and updated.
                res.send(user);
            }else{
                res.send({"message": "Oops! there was an error updating the changes."})
            }
            
        }
    }).catch (err => console.log(err));
}

const loginUser = async (req, res) => {

}

const logoutUser = async (req, res) => {

}

module.exports = {
    showUsers,
    showUsersId,
    registerUser,
    deleteUser,
    modifyUser,
    loginUser,
    logoutUser
}