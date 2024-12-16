import cartService from '../services/cartService';

let handleAddCart = async (req, res) => {
    let data = req.body;
    let message = await cartService.addCart(data)
    return res.status(200).json(message);
}

let handleGetCartByUserId = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            carts: []
        })
    }
    let carts = await cartService.getCartByUserId(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        carts
    })

}



let handleUpdateCart = async (req, res) => {
    let data = req.body;
    let message = await cartService.updateCart(data);
    return res.status(200).json(message)
}

let handleDeleteCart = async (req, res) => {
    if (!req.body.cartId) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing inputs parameter!',
        })
    }
    let message = await cartService.deleteCart(req.body.cartId);
    return res.status(200).json(message);
}

let handleDeleteAllCart = async (req, res) => {
    if (!req.body.userId) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing inputs parameter!',
        })
    }
    let message = await cartService.deleteAllCart(req.body.userId);
    return res.status(200).json(message);
}
module.exports = {
    handleGetCartByUserId: handleGetCartByUserId,
    handleAddCart: handleAddCart,
    handleUpdateCart: handleUpdateCart,
    handleDeleteCart: handleDeleteCart,
    handleDeleteAllCart: handleDeleteAllCart
}
