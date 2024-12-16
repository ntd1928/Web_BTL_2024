import db from "../models/index";


let getAllAddress = (id) =>{
    return new Promise(async(resolve,reject)=>{
        try {
            let address='';
            if(id === 'ALL'){
                address = db.Address.findAll({
                    raw: true,
                });
            }
            if(id && id !== 'ALL'){
                address = await db.Address.findOne({
                    where: {id: id},
                    raw : true ,
                })
            }
            resolve(address)
        } catch (error) {
            reject(error)
        }
    })
}

let createAddress = (data) => {
    return new Promise(async(resolve,reject)=>{
        try {  
            
            await db.Address.create({
                fullName:data.data.fullName,
                phoneNumber: data.data.phoneNumber,
                ward:data.data.ward,
                district:data.data.district,
                city:data.data.city,
                shippingAdr: data.data.shippingAdr,
                userId:data.userId
            })
            resolve({
                errCode: 0,
                message: 'OK'
            });
        } catch (error) {
            // console.error(error)
            reject(error)
        }
    })
}
let getAllAddressByUserId = (userId) =>{
    return new Promise(async(resolve,reject)=>{
        try {
            let address='';
            if(userId){
                address = await db.Address.findAll({
                    where: {userId: userId},
                    include:[{
                        model:db.User,
                        as:'users'
                    }],
                    raw:true
                })
                if(address){
                    resolve(address);
                }
            }
            
        } catch (error) {
            reject(error)
        }
    })
}

let deleteCategory = (categoryId) => {
    return new Promise (async(resolve,reject)=>{
        let foundCategory = await db.Category.findOne({
            where: {id: categoryId}
        })
        if(!foundCategory){
            resolve({
                errCode:2,
                errMessage: `The type product isn't exist`
            })
        }
        await db.Category.destroy({
            where: {id:categoryId}
        })
        resolve({
            errCode: 0,
            errMessage: `The type product is delete`
        });
    })
}

let updateAddress = (data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            if(!data.id){
                resolve({
                    errCode:2,
                    errMessage:`Missing required parameters!`
                })
            }
            let address= await db.Address.findOne({
                where: { 
                    id: data.id,
                    userId:data.userId
                },
                raw: false
            })
            console.log(address);
            if(address){
                address.fullName= data.fullName,
                address.phoneNumber= data.phoneNumber,
                address.ward= data.ward,
                address.district= data.district,
                address.city= data.city,
                address.shippingAdr= data.shippingAdr,
                await address.save();
                resolve({
                    errCode: 0,
                    message: `Update the address succeeds!`
                })
            }else{
                resolve({
                    errCode: 1,
                    errMessage: `Address's not found`
                });
            }
        } catch (error) {
            reject(error)
        }
    });
}

module.exports = {

    // CRUD category
    getAllAddress: getAllAddress,
    getAllAddressByUserId: getAllAddressByUserId,

    createAddress: createAddress,
    updateAddress: updateAddress,
    deleteCategory:deleteCategory,
}