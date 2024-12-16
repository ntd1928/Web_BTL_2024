import db from "../models/index";
const { Op } = require("sequelize");

let addCart = (data) => {
    return new Promise(async(resolve,reject)=>{
        try { 
            let cart= await db.Cart.findOne({
                where: { 
                    userId:data.userId,
                    productId:data.productId,
                    color: data.color
                },
               
                raw: false
            })
            // giong mau cung 1 san pham cua 1 nguoi dung
            if(cart){
                cart.quantity += data.quantity; 
                await cart.save();
                resolve({
                    errCode: 0,
                    errMessage:'update'
                });
                
                // other product
            }else{
                let newCart = await db.Cart.create({
                    quantity:data.quantity,
                    color: data.color,
                    productId:data.productId,
                    userId:data.userId
                })
                if(newCart){
                    resolve({
                        errCode: 0,
                        errMessage: 'OK'
                    });
                }
            }
        } catch (error) {
            reject(error)
        }
    })
}

let getCartByUserId = (userId) =>{
    return new Promise(async(resolve,reject)=>{
        try {
            let carts='';
            if(userId){
                carts = await db.Cart.findAll({
                    where: {userId: userId},
                    raw:true,
                    include:{
                        model:db.Product,
                        as:'products',
                        required: true,
                    },
                    
                })
                if(carts){
                    resolve(carts);
                }else{
                    resolve('')
                }
            }
        } catch (error) {
            reject(e)
        }
    })
}


let deleteCart = (cartId) => {
    return new Promise (async(resolve,reject)=>{
        let foundCart = await db.Cart.findOne({
            where: {id: cartId}
        })
        if(!foundCart){
            resolve({
                errCode:1,
                errMessage: `The product doesn't exist in the cart`
            })
        }
        await db.Cart.destroy({
            where: {id:cartId}
        })
        resolve({
            errCode: 0,
            errMessage: `The product in the cart has been removed`
        });
    })
}

let getCartById = (cartId)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let cart='';
            if(cartId){
                cart = await db.Cart.findOne({
                    where: {id: cartId},
                    raw:false
                })
                if(cart){
                    resolve(cart);
                }else{
                    resolve('')
                }
            }
        } catch (error) {
            reject(e)
        }
    })
}

let updateCart = (data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
           
            if(data.mess === 'quantity'){
                let cart= await getCartById(data.id);
                if(cart){
                    cart.quantity= data.quantity,
                    await cart.save();
                    resolve({
                        errCode: 0,
                        errMessage: `Update quantity succeeds!`
                    })
                }
            }
            if(data.mess === 'color'){
                // tim ra mau cap nhat
                let cartOld = await db.Cart.findOne({
                    where:{
                        userId:data.userId,
                        productId:data.productId,
                        color:data.color,
                    },
                    raw:true
                })
                if(cartOld && cartOld.id !== data.id){
                    resolve({
                        errCode: 1,
                        errMessage:'You color is already in cart!'
                    })
                }else{
                    let cart= await getCartById(data.id);
                    if(cart){
                        cart.color= data.color,
                        await cart.save();
                        resolve({
                            errCode: 0,
                            errMessage: `Update color succeeds!`
                        })
                    }
                }
                
            }
         
        } catch (error) {
            reject(error)
        }
    });
}

let deleteAllCart = (userId) => {
    return new Promise (async(resolve,reject)=>{
        let destroy=await db.Cart.destroy({
            where:{userId:userId}
        });
        if(destroy){
            resolve({
                errCode: 0,
                errMessage: `All products in the cart have been removed`
            });
        }
    })
}

module.exports = {

    // CRUD category
    getCartByUserId: getCartByUserId,
    addCart: addCart,
    updateCart: updateCart,
    deleteCart:deleteCart,
    deleteAllCart:deleteAllCart
}