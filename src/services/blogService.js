import db from "../models/index";
// const { Op } = require("sequelize");

let getAllBlogs = (blogId) =>{
    return new Promise(async(resolve,reject)=>{
        try {
            let blogs='';
            if(blogId === 'ALL'){
                blogs = db.Blog.findAll({
                    raw: true,
                });
            }
            if(blogId && blogId !== 'ALL'){
                blogs = await db.Blog.findOne({
                    where: {id: blogId},
                    raw : true ,
                })
            }
            resolve(blogs)
        } catch (error) {
            reject(error)
        }
    })
}

let getBlogsByName=(blogName)=>{
    return new Promise( async(resolve,reject)=>{
        try {
            let blogs = await db.Blog.findAll({
                where: {
                    name:blogName
                },
                raw: true,
            })
            if(blogs){
                resolve(blogs)
            }else{
                resolve('')
            }
        } catch (error) {
            reject(error);
        }
    })
}

let createNewBlog = (data,file) => {
    return new Promise(async(resolve,reject)=>{
        try { 
            console.log(data);
            await db.Blog.create({
                name: data.name,
                photo: file.filename,
                writer: data.writer,
                slug: data.slug,
                description: data.description,
                content: data.content,
                hidden: data.hidden,
                newBlog: data.newBlog,
            })
            resolve({
                errCode: 0,
                message: 'OK'
            }); 
        } catch (error) {
            console.error(error)
            reject(error)
        }
    })
}

let deleteBlog = (blogId) => {
    return new Promise (async(resolve,reject)=>{
        try {
            let foundBlog = await db.Blog.findOne({
                where: {id: blogId},
            })
            if(!foundBlog){
                resolve({
                    errCode:1,
                    errMessage: `The Blog isn't exist`
                })
            }else{
                await db.Blog.destroy({
                    where: {id:blogId}
                })
                resolve({
                    errCode: 0,
                    errMessage: `The Blog is delete`
                });
            }
            
        } catch (error) {
            reject(error)
        }
    })
}

let updateBlogData = (data,file)=>{
    console.log(data);
    return new Promise(async(resolve,reject)=>{
        try {
            if(!data.id){
                resolve({
                    errCode:2,
                    errMessage:`Missing required parameters!`
                })
            }
            let blog= await db.Blog.findOne({
                where: { id: data.id},
                raw: false
            })
            console.log(file);
            if(file){
               var photo = file.filename
            }else{
                var photo = data.photo
            }
            console.log(photo);
            if(blog){
                blog.name= data.name,
                blog.photo= photo,
                blog.writer=data.writer,
                blog.slug=data.slug,
                blog.description=data.description,
                blog.content=data.content,
                blog.hidden=data.hidden,
                blog.new=data.new
                await blog.save();
                resolve({
                    errCode: 0,
                    message: `Update the blog succeeds!`
                })
            }else{
                resolve({
                    errCode: 1,
                    errMessage: `Blog's not found`
                });
            }
        } catch (error) {
            reject(error)
        }
    });
}
let addComment = (data) => {
    return new Promise(async(resolve,reject)=>{
        try { 
            console.log(data);
            await db.Comment.create({
                content: data.content,
                blogId: data.blogId,
                userId: data.userId,
                status: data.status ? 1 : 0 
            })
            resolve({
                errCode: 0,
                message: 'You just posted a new comment about this blogs!'
            }); 
        } catch (error) {
            console.error(error)
            reject(error)
        }
    })
}

let getAllComments = (id) =>{
    return new Promise(async(resolve,reject)=>{
        try {
            let comments='';
            if(id === 'ALL'){
                comments = db.Comment.findAll({
                    raw: true,
                });
            }
            if(id && id !== 'ALL'){
                comments = await db.Comment.findOne({
                    where: {id: id},
                    raw : true ,
                })
            }
            resolve(comments)
        } catch (error) {
            reject(error)
        }
    })
}


let updateComment = (data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            if(!data.id){
                resolve({
                    errCode:2,
                    errMessage:`Missing required parameters!`
                })
            }
            let comment= await db.Comment.findOne({
                where: { id: data.id},
                raw: false
            })
           
            if(comment){
                
                comment.status= data.status,
                // comment.content= comment.content,
                // comment.userId=data.writer,
                
                await comment.save();
                resolve({
                    errCode: 0,
                    message: `Update the comment succeeds!`
                })
            }else{
                resolve({
                    errCode: 1,
                    errMessage: `Comment's not found`
                });
            }
        } catch (error) {
            reject(error)
        }
    });
}


let updateCommentUser = (data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            if(!data.id){
                resolve({
                    errCode:2,
                    errMessage:`Missing required parameters!`
                })
            }
            let comment= await db.Comment.findOne({
                where: { id: data.id},
                raw: false
            })
           console.log(data);
            if(comment){
                
                // comment.status= data.status,
                comment.content= data.content,
                // comment.userId=data.writer,
                
                await comment.save();
                resolve({
                    errCode: 0,
                    message: `Update the comment succeeds!`
                })
            }else{
                resolve({
                    errCode: 1,
                    errMessage: `Comment's not found`
                });
            }
        } catch (error) {
            reject(error)
        }
    });
}

let deleteComment = (commentId) => {
    return new Promise (async(resolve,reject)=>{
        try {
            let foundComment = await db.Comment.findOne({
                where: {id: commentId},
                raw:true,
            })
            if(!foundComment){
                resolve({
                    errCode:2,
                    errMessage: `The Comment isn't exist`
                })
            }
            await db.Comment.destroy({
                where: {id:commentId}
            })
            resolve({
                errCode: 0,
                errMessage: `The Comment is delete`
            });
        } catch (error) {
            reject(error)
        }
    })
}


module.exports = {
    getAllBlogs:getAllBlogs,
    getBlogsByName:getBlogsByName,
    createNewBlog:createNewBlog,
    updateBlogData:updateBlogData,
    deleteBlog:deleteBlog,
    addComment:addComment,
    getAllComments:getAllComments,
    updateComment:updateComment,
    updateCommentUser:updateCommentUser,
    deleteComment:deleteComment
}