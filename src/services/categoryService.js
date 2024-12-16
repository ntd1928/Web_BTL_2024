import db from "../models/index";
const { Op } = require("sequelize");


let getAllCategories = (categoryId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let categories = '';
            if (categoryId === 'ALL') {
                categories = db.Category.findAll();
            }
            if (categoryId && categoryId !== 'ALL') {
                categories = await db.Category.findOne({
                    where: { id: categoryId },
                    raw: true
                })
            }
            resolve(categories);
        } catch (error) {
            reject(e)
        }
    })
}


let createNewCategory = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Tìm kiếm category với tên trùng
            var findName = await db.Category.findOne({
                where: { name: data.name } // Sử dụng where
            });

            if (!findName) {
                // Nếu không tìm thấy, tạo mới
                await db.Category.create({
                    name: data.name,
                    description: data.description,
                });
                resolve({
                    errCode: 0,
                    message: 'OK',
                });
            } else {
                // Nếu đã tồn tại
                resolve({
                    errCode: 1,
                    message: 'Your category is already in use, please try another name!',
                });
            }
        } catch (error) {
            reject(error); // Bắt lỗi và trả về
        }
    });
};
let getCategoriesWithPagination = (searchCategory, pageCategory, limitCategory) => {
    return new Promise(async (resolve, reject) => {
        try {
            const page = parseInt(pageCategory) || 0;
            const limit = parseInt(limitCategory) || 10;
            const search = searchCategory || '';
            const offset = limit * page;
            const totalRows = await db.Category.count({
                where: {
                    [Op.or]: [{
                        name: {
                            [Op.iLike]: '%' + search + '%'
                        }
                    }]
                }
            })
            const totalPage = Math.ceil(totalRows / limit);
            const result = await db.Category.findAll({
                where: {
                    [Op.or]: {
                        name: {
                            [Op.iLike]: '%' + search + '%'
                        }
                    }
                },
                raw: true,
                offset: offset,
                limit: limit,
                order: [['createdAt', 'DESC']]
            })
            // resolve(result)
            resolve({
                categories: result,
                page: page,
                limit: limit,
                totalRows: totalRows,
                totalPage: totalPage
            })
        } catch (error) {
            reject(error)
        }
    })
}
let deleteCategory = (categoryId) => {
    return new Promise(async (resolve, reject) => {
        let foundCategory = await db.Category.findOne({
            where: { id: categoryId }
        })
        if (!foundCategory) {
            resolve({
                errCode: 2,
                errMessage: `The type product isn't exist`
            })
        }
        await db.Category.destroy({
            where: { id: categoryId }
        })
        resolve({
            errCode: 0,
            errMessage: `The type product is delete`
        });
    })
}

let updateCategoryData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: `Missing required parameters!`
                })
            }
            let Category = await db.Category.findOne({
                where: { id: data.id },
                raw: false
            })
            if (Category) {
                Category.name = data.name,
                    Category.description = data.description,

                    await Category.save();
                resolve({
                    errCode: 0,
                    message: `Update the type product succeeds!`
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: `Type product's not found`
                });
            }
        } catch (error) {
            reject(error)
        }
    });
}

module.exports = {

    // CRUD category
    getAllCategories: getAllCategories,
    getCategoriesWithPagination: getCategoriesWithPagination,

    createNewCategory: createNewCategory,
    updateCategoryData: updateCategoryData,
    deleteCategory: deleteCategory,
}