import db from "../models/index";
// const { Op } = require("sequelize");


let addOrder = (data) => {
    console.log(data);
    return new Promise(async(resolve,reject)=>{
        try { 
            await db.Order.create({
                number:data.number,
                grandtotal:data.grandTotal,
                message: data.message,
                userId: data.userId,
                addressId: data.addressId,
            }).then(async(order)=>{
                if(order){
                    if(data.list){
                        for(let i=0;i<data.list.length;i++){
                            await db.DetailOrder.create({
                                quantity:data.list[i].quantity,
                                color: data.list[i].color,
                                price:data.list[i].price,
                                orderId:order.id,
                                productId:data.list[i].productId,
                            }).then( async(detail) =>{
                                if(detail){
                                    var update = await updateQtyProduct(data.list[i].productId, data.list[i].quantity);
                                    if(update){
                                        resolve({
                                            errCode: 0,
                                            message: 'OK'
                                        });  
                                    }else{
                                        resolve({
                                            errCode: 1,
                                            message: 'fail'
                                        });  
                                    }
                                }
                            })
                        }
                        
                    }
                }
            })
           
        } catch (error) {
            console.error(error)
            reject(error)
        }
    })
}


let updateQtyProduct = (productId,qty)=>{
    return new Promise(async(resolve, reject) => {
        try {
            var product = await db.Product.findOne({
                where:{id:productId},
                raw: false
            })
            if(product){
                product.totalQty= product.totalQty - qty
                await product.save();
                resolve(true);
            }else{
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    })
}
let getAllOrders = (id) =>{
    return new Promise(async(resolve,reject)=>{
        try {
            let order='';
            if(id === 'ALL'){
                order = db.Order.findAll({
                    raw: true,
                });
            }
            if(id && id !== 'ALL'){
                order = await db.Order.findOne({
                    where: {id: id},
                    raw : true ,
                })
            }
            resolve(order)
        } catch (error) {
            reject(error)
        }
    })
}
let getAllOrdersByUserId = (userId) =>{
    return new Promise(async(resolve,reject)=>{
        try {
            let orders='';
            if(userId){
                orders = await db.Order.findAll({
                    where: {userId: userId},
                    raw : true ,
                })
            }
            resolve(orders)
        } catch (error) {
            reject(error)
        }
    })
}
let getDetailOrderByOrderId = (orderId) =>{
    return new Promise(async(resolve,reject)=>{
        try {
            let detailorders='';
            if(orderId){
                detailorders = await db.DetailOrder.findAll({
                    where: {orderId: orderId},
                    
                    include:[{
                        model: db.Product,
                        as:'products'
                    }],
                    // include:[{
                    //     model: db.Order,
                    //     as:'orders'
                    // }],
                    raw : true ,
                })
            }
            resolve(detailorders)
        } catch (error) {
            reject(error)
        }
    })
}

let updateStatus = (data)=>{
    console.log(data);
    return new Promise(async(resolve, reject) => {
        try {
            let order = await db.Order.findOne({
                where:{id:data.id},
                raw: false
            });
            console.log(order);
            if(order){
                order.number = order.number,
                order.grandtotal = order.grandtotal,
                order.message = order.message,
                order.status= data.status,
                order.deliveryDate= data.deliveryDate,
                order.userId = order.userId,
                order.addressId = order.addressId
                
                await order.save();
                // db.Order.update({
                //     status: status,
                //     deliverydate: deliverydate ? deliverydate : list.deliverydate
                // })
                resolve({
                    errCode: 0,
                    message: `Update the status succeeds!`
                })
            }else{
                resolve({
                    errCode: 1,
                    message: `Order not found!`
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    addOrder:addOrder,
    getAllOrders:getAllOrders,
    getAllOrdersByUserId:getAllOrdersByUserId,
    getDetailOrderByOrderId:getDetailOrderByOrderId,
    updateStatus:updateStatus,
    updateQtyProduct: updateQtyProduct,
}