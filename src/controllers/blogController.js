import blogService from '../services/blogService';

let handleCreateBlog = async(req,res) => {
    let message = await blogService.createNewBlog(req.body,req.file)
    return res.status(200).json(message);
}

let handleAddComment = async(req,res) => {
    
    let message = await blogService.addComment(req.body);
    return res.status(200).json(message);
}
let handleGetAllComments = async(req,res) => {
    let id = req.query.id;
    if(!id){
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            comments : []
        })
    }
    let comments = await blogService.getAllComments(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        comments 
    })
}


let handleUpdateComment = async(req,res) => {
    let message = await blogService.updateComment(req.body);
    return res.status(200).json(message);
}


let handleUpdateCommentUser = async(req,res) => {
    let message = await blogService.updateCommentUser(req.body);
    return res.status(200).json(message);
}

let handleDeleteComment = async(req,res) => {
    if(!req.body.commentId){
        return res.status(200).json({
            errCode : 1,
            errMessage: 'Missing inputs parameter!',
        })
    }
    let message = await blogService.deleteComment(req.body.commentId);
    return res.status(200).json(message);
}


let handleGetAllBlogs = async(req,res) => {
    let id = req.query.id;
    if(!id){
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            blogs : []
        })
    }
    let blogs = await blogService.getAllBlogs(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        blogs 
    })
}



let handleUpdateBlog = async(req,res) => {
    console.log(req.body,req.file);
    let message = await blogService.updateBlogData(req.body,req.file);
    return res.status(200).json(message);
}

let handleDeleteBlog = async(req,res) => {
    if(!req.body.blogId){
        return res.status(200).json({
            errCode : 1,
            errMessage: 'Missing inputs parameter!',
        })
    }
    let message = await blogService.deleteBlog(req.body.blogId);
    return res.status(200).json(message);
}


module.exports = {
    handleGetAllBlogs: handleGetAllBlogs,
    handleGetAllComments:handleGetAllComments,
    handleCreateBlog: handleCreateBlog,
    handleAddComment:handleAddComment,
    handleUpdateBlog: handleUpdateBlog,
    handleDeleteBlog: handleDeleteBlog,
    handleUpdateComment: handleUpdateComment,
    handleUpdateCommentUser:handleUpdateCommentUser,
    handleDeleteComment:handleDeleteComment
}
