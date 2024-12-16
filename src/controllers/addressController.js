import addressService from '../services/addressService';

let handleCreateAddress = async(req,res) => {
    let data = req.body.dataList;
    let userId = req.body.dataList.userId;
    let message = await addressService.createAddress(data,userId)
    return res.status(200).json(message);
}
let handleGetAllAddress = async(req,res) => {
    let id = req.query.id;
    if(!id){
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            address : []
        })
    }
    let address = await addressService.getAllAddress(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        address 
    })
}

let handleGetAllAddressByUserId = async(req,res) => {
    let id = req.query.id;
    if(!id){
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            address : []
        })
    }
    let address = await addressService.getAllAddressByUserId(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        address 
    })
}



let handleUpdateAddress = async(req,res) => {
    let data = req.body;
    let message = await addressService.updateAddress(data);
    return res.status(200).json(message)
}

let handleDeleteCart = async(req,res) => {
    if(!req.body.cartId){
        return res.status(200).json({
            errCode : 1,
            errMessage: 'Missing inputs parameter!',
        })
    }
    let message = await addressService.deleteCart(req.body.cartId);
    return res.status(200).json(message);
}

let handleDeleteAllCart = async(req,res) => {
    if(!req.body.userId){
        return res.status(200).json({
            errCode : 1,
            errMessage: 'Missing inputs parameter!',
        })
    }
    let message = await addressService.deleteAllCart(req.body.userId);
    return res.status(200).json(message);
}
module.exports = {
    handleGetAllAddress: handleGetAllAddress,
    handleGetAllAddressByUserId: handleGetAllAddressByUserId,
    handleCreateAddress: handleCreateAddress,
    handleUpdateAddress: handleUpdateAddress,
    handleDeleteCart: handleDeleteCart,
    handleDeleteAllCart:handleDeleteAllCart
}
