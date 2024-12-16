import userService from "../services/userService";
import db from "../models";
const ROLES =db.ROLES;
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");


// let handleGetUser = async(req,res)=>{
//     let token = req.session.token;

//     if (!token) {
//         return res.status(403).send({
//         message: "No token provided!",
//         });
//     }
//     jwt.verify(token, config.secret, (err, decoded) => {
//         if (err) {
//           return res.status(401).send({
//             message: "Unauthorized!",
//           });
//         }
//         req.userId = decoded.id;
//       });
// }

// let handleGetAdmin = async(req,res)=>{

//     let token = req.session.token;

//     if (!token) {
//         return res.status(403).send({
//         message: "No token provided!",
//         });
//     }
//     try {
//         const user = await db.User.findByPk(req.body.userId);
//         const roles = await user.getRoles();
    
//         for (let i = 0; i < roles.length; i++) {
//           if (roles[i].name === "admin") {
//             return next();
//           }
//         }
    
//         return res.status(403).send({
//           message: "Require Admin Role!",
//         });
//       } catch (error) {
//         return res.status(500).send({
//           message: "Unable to validate User role!",
//         });
//       }
// }
let verifyToken = (req, res) => {
    let token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send({
        message: "No token provided!"
      });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!"
        });
      }
      req.userId = decoded.id;
    });
  };

let handleLogin = async(req,res) => {
    let userData = await userService.handleUserLogin(req.body);
    console.log(userData);
    
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user : userData.user ? userData.user : {},
        token: userData.token
    })
};

let handleRegister = async(req,res) => {
    let message = await userService.createNewUser(req.body);
    return res.status(200).json({
        errCode: message.errCode,
        message: message.errMessage,
    })
}
let handleLogout = async(req,res) =>{
    try {
        req.session = null;
        return res.status(200).send({
            message: "You've been signed out!"
          });
    } catch (error) {
        this.next(error);
    }
}
let handleGetAllUsers = async(req,res) => {
    let id = req.query.id;
    if(!id){
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            users : []
        })
    
    }
    let users = await userService.getAllUsers(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        users
    })
}
let handleGetUserByEmail = async(req,res) => {
    let email = req.query.email;
    if(!email){
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            user: []
        })
    
    }
    let user= await userService.getUserByEmail(email);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        user
    })
}

let handleCreateNewUser = async(req,res) => {
    let message = await userService.createNewUser(req.body);
    // console.log(ROLES)
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            console.log(req.body.roles[i])
          if (!ROLES.includes(req.body.roles[i])) {

            res.status(400).send({
              message: "Failed! Role does not exist = " + req.body.roles[i]
            });
            return;
          }
        }
      }
    return res.status(200).json(message);
}

let handleEditUser = async(req,res) => {
    let data = req.body;
    let message = await userService.updateUserData(data);
    return res.status(200).json(message)
}

let handleDeleteUser = async(req,res) => {
    if(!req.body.id){
        return res.status(200).json({
            errCode : 1,
            message: 'Missing inputs parameter!',
        })
    }
    let message = await userService.deleteUser(req.body.id);
    return res.status(200).json(message);
}

let handleIsAdmin = async(req,res)=>{
    if(!req.body.id){
        return res.status(200).json({
            errCode : 1,
            message: 'Missing inputs parameter!',
        })
    }
    let message = await userService.isAdmin(req.body.id);
    return res.status(200).json(message);
}
module.exports = {
    handleLogin: handleLogin,
    handleRegister: handleRegister,
    handleLogout:handleLogout,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
    verifyToken:verifyToken,
    handleGetUserByEmail:handleGetUserByEmail,
    handleIsAdmin:handleIsAdmin
    
}

// exports.handleLogin = (req,res) => {
//     let {email,password} = req.body;
//     let hello = req.body.hello;
//     res.send({
//         email : email,
//         password: password,
//         message: hello
//     })

// }

