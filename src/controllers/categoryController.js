import categoryService from '../services/categoryService';

let handleGetAllCategories = async(req,res) => {
    let id = req.query.id;
    if(!id){
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            categories : []
        })
    }
    let categories = await categoryService.getAllCategories(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        categories 
    })

}

let handleCreateNewCategory = async(req,res) => {
    let data = req.body;
    let message = await categoryService.createNewCategory(data)
    return res.status(200).json(message);
}

let handleEditCategory = async(req,res) => {
    let data = req.body;
    let message = await categoryService.updateCategoryData(data);
    return res.status(200).json(message)
}

let handleDeleteCategory = async(req,res) => {
    if(!req.body.id){
        return res.status(200).json({
            errCode : 1,
            message: 'Missing inputs parameter!',
        })
    }
    let message = await categoryService.deleteCategory(req.body.id);
    return res.status(200).json(message);
}
module.exports = {
    handleGetAllCategories: handleGetAllCategories,
    handleCreateNewCategory: handleCreateNewCategory,
    handleEditCategory: handleEditCategory,
    handleDeleteCategory: handleDeleteCategory,
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

