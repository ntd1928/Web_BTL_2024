import bcrypt from 'bcryptjs'
import db from "../models/index";
const salt = bcrypt.genSaltSync(10);
const { Op } = require("sequelize");
var jwt = require('jsonwebtoken');
const config = require("../config/auth.config");


let hashUserPassword = (password) => {
    return new Promise( async(resolve, reject) => {
        try {
            var hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (error) {
            reject(error);
        }
    })
}
let createNewUser = (data) => {
    return new Promise(async(resolve,reject)=>{
        try {
            // check email is exist?
            let checkEmail = await checkUsersEmail(data.email);
            let checkPhone = await checkUsersPhoneNumber(data.phoneNumber)
            if(checkEmail === true || checkPhone === true){
                if(checkEmail === true){
                    resolve({
                        errCode:2,
                        errMessage: 'Your email is already in used, Please try another email!'
                    })
                }
                if(checkPhone===true){
                    resolve({
                        errCode:2,
                        errMessage: 'Your phone number is already in used, Please try another phone number!'
                    })
                }
            }else{
                if(data.password !== data.confirmPassword){
                    resolve({
                        errCode:3,
                        errMessage: 'Password and Confirm Password do not match!'
                    })
                }else{
                    let hashPasswordFromBcrypt = await hashUserPassword(data.password);                    
                    await db.User.create({
                        username:data.username,
                        email: data.email,
                        password: hashPasswordFromBcrypt,
                        phoneNumber: data.phoneNumber,                        
                    }).then( async(user) => {
                        if (data.roles) {
                            await db.Role.findAll({
                              where: {
                                name: {
                                  [Op.or]: data.roles,
                                },
                              },
                            }).then(roles=>{
                                for(let i=0;i<roles.length;i++){
                                    console.log(roles[i].id);
                                    user.setRoles(roles[i].id).then(()=>{
                                        resolve({
                                            errCode: 0,
                                            message: "User registered successfully!"
                                        })
                                    })
                                }
                            })
                        } else {
                            // user has role = 1
                            user.setRoles([1]).then(()=>{
                                resolve({
                                    errCode: 0,
                                    message: "User registered successfully!"
                                })
                            });
                          }
                    })
                }
                
            }
            
        } catch (error) {
            reject(error)
        }
    })
}
let generateJWTToken = (user)=> {
    return new Promise((resolve, reject) => {
        try {
            let JWT = jwt.sign({
                email: user.email, 
                userId: user.id},config.secret );
            
            resolve(JWT);
        } catch (error) {
            reject(error)
        }
    })
}

let handleUserLogin = (data) => {
    return new Promise(async(resolve,reject) => {
        try {
            let isExist = await checkUsersEmail(data.email);
            if(isExist){
                await db.User.findOne({
                    attributes : ['email','password'],
                    where: { email: data.email},
                    raw: true,
                }).then(async(user) =>{
                    if(user){
                        let check = bcrypt.compareSync(data.password, user.password);
                        if(check){
                            var token = await generateJWTToken(user);
                            // let authorities = [];
                            
                            resolve({
                                token: token,
                                // roles:authorities,
                                user:user,
                                errCode:0,
                                errMessage: 'OK!'
                            })
                            delete user.password;
                            // await user.getRoles().then((roles)=>{
                            //     for (let i = 0; i < roles.length; i++) {
                            //         authorities.push("ROLE_" + roles[i].name.toUpperCase());
                            //     }
                            //     resolve({
                            //         token: token,
                            //         roles:authorities,
                            //         user:user,
                            //         errCode:0,
                            //         errMessage: 'OK!'
                            //     })
                            //     delete user.password;
                            // });
                        }else{
                            resolve({
                                token:null,
                                errCode:3,
                                errMessage: 'Wrong password!',
                            })
                            // userData.errCode = 3;
                            // userData.errMessage = `Wrong password`;
                        }
                    }else{
                        resolve({
                            errCode:2,
                            errMessage: `User's not found!`
                        })
                        // userData.errCode =2;
                        // userData.errMessage = ``;
    
                    }
                    
                })
                
                
                
            }else{
                resolve({
                    errCode:1,
                    errMessage: `Your's email isn't exist in your system. Please try other email!`
                })
                // userData.errCode = 1;
                // userData.errMessage = ` `;
            }
        } catch (error) {
            reject(error)
        }
    })
}


let checkUsersEmail = (userEmail) => {
    return new Promise(async(resolve, reject) => {
        try{
            let user = await db.User.findOne({
                where: { email: userEmail}
            });
            if(user){
                resolve(true)
            }else{
                resolve(false)
            }
        }catch(error){
            reject(error)

        }
    })
}

let checkUsersPhoneNumber = (phone) => {
    return new Promise(async(resolve, reject) => {
        try{
            let user = await db.User.findOne({
                where: { phoneNumber: phone}
            });
            if(user){
                resolve(true)
            }else{
                resolve(false)
            }
        }catch(error){
            reject(error)

        }
    })
}

let getUserByEmail = (userEmail) => {

    return new Promise(async(resolve, reject) => {
        try{
            let user = await db.User.findOne({
                where: { email: userEmail}
            });
            if(user){
                resolve(user)
            }else{
                resolve('')
            }
        }catch(error){
            reject(error)

        }
    })
}


let getAllUsers = (userId) =>{
    return new Promise(async(resolve,reject)=>{
        try {
            let users='';
            if(userId === 'ALL'){
                users = db.User.findAll({
                    attributes:{
                        exclude: ['password']
                    }
                })
            }

            if(userId && userId!=='ALL'){
                users = await db.User.findOne({
                    where: {id: userId},
                    attributes:{
                        exclude: ['password']
                    }
                })
            }
            resolve(users)
        } catch (error) {
            reject(error)
        }
    })
}


let deleteUser = (userId) => {
    return new Promise (async(resolve,reject)=>{
        let foundUser = await db.User.findOne({
            where: {id: userId}
        })
        if(!foundUser){
            resolve({
                errCode:2,
                errMessage: `The user isn't exist`
            })
        }
        await db.User.destroy({
            where: {id:userId}
        })
        resolve({
            errCode: 0,
            errMessage: `The user is delete`
        });
    })
}

let updateUserData = (data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            if(!data.id){
                resolve({
                    errCode:2,
                    errMessage:`Missing required parameters!`
                })
            }
            let user= await db.User.findOne({
                where: { id: data.id},
                raw: false
            })
            if(user){
                user.phoneNumber= data.phoneNumber,
                await user.save();
                resolve({
                    errCode: 0,
                    message: `Update the user succeeds!`
                })
            }else{
                resolve({
                    errCode: 1,
                    errMessage: `User's not found`
                });
            }
        } catch (error) {
            reject(error)
        }
    });
}

// let getAllRole = (roleId) =>{
//     return new Promise(async(resolve,reject)=>{
//         try {
//             let roles='';
//             if(roleId === 'ALL'){
//                 roles = db.Role.findAll({
//                     raw: true,
//                 });
//             }
//             if(roleId && roleId !== 'ALL'){
//                 roles = await db.Role.findOne({
//                     where: {id: roleId},
//                     raw : true ,
//                 })
//             }
//             resolve(roles)
//         } catch (error) {
//             reject(error)
//         }
//     })
// }

let getRoleByUser=(userId)=>{
    return new Promise( async(resolve,reject)=>{
        try {
            let role = await db.UserRole.findAll({
                where: {
                    name:userId
                },
                raw: true,
            })
            if(role){
                resolve(role)
            }else{
                resolve('')
            }
        } catch (error) {
            reject(error);
        }
    })
}

let isAdmin = (id)=> {
    return new Promise(async(resolve, reject) => {
        try {
            const user = await db.User.findByPk(id);
            
            const roles = await user.getRoles(user.id);
            for (let i = 0; i < roles.length; i++) {
              if (roles[i].name === "admin") {
                    resolve({
                        errCode: 0,
                        
                    })
              }
            }
        
          } catch (error) {
            reject(error);
          }
    })
  };

module.exports = {
    checkUsersEmail : checkUsersEmail,
    checkUsersPhoneNumber: checkUsersPhoneNumber,
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser:deleteUser,
    updateUserData: updateUserData,
    generateJWTToken:generateJWTToken,
    getUserByEmail:getUserByEmail,
    isAdmin:isAdmin
    // getAllRole: getAllRole
}