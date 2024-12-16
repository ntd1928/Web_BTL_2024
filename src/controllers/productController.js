import productService from "../services/productService";

let handleGetAllProducts = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            products: []
        })
    }
    let products = await productService.getAllProducts(id);
    // console.log(products)
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        products
    })
}
let handleGetSearchProducts = async (req, res) => {
    let search = req.query.search;
    if (!search) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            products: []
        })
    }
    let products = await productService.getProductByNameSearch(search);
    // console.log(products)
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        products
    })
}

let handleGetAllProductsSearchPagination = async (req, res) => {
    let { search, page, limit } = req.query;
    if (!search && !page && !limit) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            products: []
        })
    }
    let products = await productService.getProductsWithSearchPagination(search, page, limit);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        products
    })
}

let handleGetProductByCategory = async (req, res) => {
    let categoryId = req.query.categoryId;
    if (!categoryId) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing inputs parameter!',
            products: []
        })
    }
    let products = await productService.getProductsByCategory(categoryId);
    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        products
    })

}
let handleGetAllProductPhoto = async (req, res) => {
    let productId = req.query.productId;
    if (!productId) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing inputs parameter!',
            productphotos: []
        })
    }
    let productphotos = await productService.getAllProductPhoto(productId);
    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        productphotos
    })
}

let handleCreateProductPhoto = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: "No files were uploaded." });
        }

        console.log("Files received:", req.files);
        let message = await productService.createNewProductPhoto(req.body, req.files);
        return res.status(200).json(message);

    } catch (error) {
        console.error("Error creating product photo:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

let handleGetDetailProduct = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing inputs parameter!',
            detailproducts: []
        })
    }
    let detailproducts = await productService.getDetailProduct(id);
    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        detailproducts
    })
}

let handleCreateNewProduct = async (req, res) => {
    let message = await productService.createNewProduct(req.body, req.file);
    return res.status(200).json(message);
}

let handleEditProduct = async (req, res) => {
    let message = await productService.updateProductData(req.body, req.file);
    return res.status(200).json(message)
}
let handleDeleteProduct = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing inputs parameter!',
        })
    }
    let message = await productService.deleteProduct(req.body.id);
    return res.status(200).json(message);
}


let handleGetAllColors = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            colors: []
        })
    }
    let colors = await productService.getAllColors(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        colors
    })
}

let handleCreateNewColor = async (req, res) => {
    let message = await productService.createNewColor(req.body);
    return res.status(200).json(message);
}

let handleDeleteColor = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing inputs parameter!',
        })
    }
    let message = await productService.deleteColor(req.body.id);
    return res.status(200).json(message);
}
let handleEditColor = async (req, res) => {
    let data = req.body;
    let message = await productService.updateColor(data);
    return res.status(200).json(message)
}
let handleCreateProductColor = async (req, res) => {
    let message = await productService.createNewProductColor(req.body);
    return res.status(200).json(message);
}
let handleAddFeedback = async (req, res) => {
    let message = await productService.addFeedback(req.body);
    return res.status(200).json(message);

}
let handleGetAllFeedbacks = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            feedbacks: []
        })
    }
    let feedbacks = await productService.getAllFeedbacks(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        feedbacks
    })
}


let handleUpdateFeedback = async (req, res) => {
    let message = await productService.updateFeedback(req.body);
    return res.status(200).json(message);
}

let handleDeleteFeedback = async (req, res) => {
    if (!req.body.feedbackId) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing inputs parameter!',
        })
    }
    let message = await productService.deleteFeedback(req.body.feedbackId);
    return res.status(200).json(message);
}
module.exports = {
    handleGetAllProducts: handleGetAllProducts,
    handleGetSearchProducts: handleGetSearchProducts,

    handleCreateNewProduct: handleCreateNewProduct,
    handleEditProduct: handleEditProduct,
    handleDeleteProduct: handleDeleteProduct,
    handleGetAllColors: handleGetAllColors,
    handleCreateNewColor: handleCreateNewColor,
    handleCreateProductColor: handleCreateProductColor,
    handleCreateProductPhoto: handleCreateProductPhoto,
    handleGetDetailProduct: handleGetDetailProduct,
    handleDeleteColor: handleDeleteColor,
    handleEditColor: handleEditColor,

    handleGetAllProductsSearchPagination: handleGetAllProductsSearchPagination,
    handleGetAllColors: handleGetAllColors,
    handleGetAllProductPhoto: handleGetAllProductPhoto,
    handleGetProductByCategory: handleGetProductByCategory,

    handleAddFeedback: handleAddFeedback,
    handleGetAllFeedbacks: handleGetAllFeedbacks,
    handleUpdateFeedback: handleUpdateFeedback,
    handleDeleteFeedback: handleDeleteFeedback


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

