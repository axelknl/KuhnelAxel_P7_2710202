const { compareSync } = require('bcrypt');
const { validationResult } = require('express-validator');
const PostModel = require('../models/post.model');
const HttpException = require('../utils/HttpException.utils');


class PostController {
    getAllPosts = async (req, res, next) => {
        let postList = await PostModel.find();
        
        if (!postList.length) {
            throw new HttpException(404, 'Posts not found');
        }

        postList = postList.map(post => {return post});
        console.log(postList.length);

        res.send(postList);
    }

    updatePost = async (req, res, next) => {
        console.log(req.body.description)

        const verifyOwner = await PostModel.findOne(req.params.id);

        if (req.currentUser.id != verifyOwner[0].user_id) {
            throw new HttpException(401, 'Access denied, not owner of the post')
        }

        const result = await PostModel.update(req.body.description, req.params.id);

        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info} = result;

        const message = !affectedRows ? 'Comment not found' :
            affectedRows && changedRows ? 'Comment updated successfully' : 'Updated faild';

        res.send({message, info});
    }
    
    createPost = async (req, res, next) => {
        console.log(req.currentUser)
        this.checkValidation(req)
        const reqPush = {
            picture : req.body.picture,
            description : req.body.description,
            date : req.body.date,
            user_id : req.currentUser.id
        }

        console.log(reqPush)

        const result = await PostModel.create(reqPush);

        if (!result) {
            throw new HttpException(500, 'something went wrong');
        }

        res.status(201).send('Post was created !');
    }

    deletePost = async (req, res, next) => {

        const verifyOwner = await PostModel.findOne(req.params.id);

        await PostModel.deleteAllComment(req.params.id)

        await PostModel.deleteAllLike(req.params.id)

        if (req.currentUser.id != verifyOwner[0].user_id && req.currentUser.role != 'Admin') {
            throw new HttpException(401, 'Access denied, not owner of the post')
        }

        const result = await PostModel.delete(req.params.id);
        if (!result) {
            throw new HttpException(404, 'Post not found');
        }
        res.send('Post has been deleted');
    }

    getLike = async (req, res, next) => {

        let likeList = await PostModel.findLike(req.params.id);

        if(!likeList.length) {
            throw new HttpException(404, 'Likes not found');
        }
        
        res.send(likeList)
    }

    updateLike = async (req, res, next) => {
        console.log(req.body)

        const result = await PostModel.updateLike(req.body.like, req.params.id);

        if (!result) {
            throw new HttpException(404, 'Something went wrong')
        }

        const { affectedRows, changedRows, info} = result; 

        const message = !affectedRows ? 'Post not found' :
            affectedRows && changedRows ? 'Post updated successfully' : 'Updated faild';

        res.send({message, info});
    }

    createLike = async (req, res, next) => {

        const result = await PostModel.createLike(req.body);

        if (!result) {
            throw new HttpException(500, 'Something went wrong')
        }

        res.status(201).send('Like was created')
    }

    deleteLike = async (req, res, next) => {
        console.log(req.body);

        const result = await PostModel.deleteLike(req.body);

        if (!result) {
            throw new HttpException(404, 'Like not found');
        }

        res.send('Like has been deleted');
    }

    getComment = async (req, res, next) => {
        let comList = await PostModel.getComment(req.params.id);

        if(!comList.length) {
            throw new HttpException(404, 'Comments not found');
        }

        comList = comList.map(com => { return com})

        res.send(comList)

    }

    updateComment = async (req, res, next) => {

        const verifyOwner = await PostModel.findOneComment(req.params.id);

        if (req.currentUser.id != verifyOwner[0].comment_user) {
            throw new HttpException(401, 'Access denied, not owner of the comment')
        }

        const result = await PostModel.updateComment(req.body.message, req.params.id)

        if (!result) {
            throw new HttpException(404, 'Something went wrong')
        }

        const { affectedRows, changedRows, info} = result;

        const message = !affectedRows ? 'Comment not found' :
            affectedRows && changedRows ? 'Comment updated successfully' : 'Updated faild';

        res.send({message, info});
    }

    createComment = async (req, res, next) => {
        console.log(req.body);

        const result = await PostModel.createComment(req.body);

        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send('Comment was created!')
    }

    deleteComment = async (req, res, next) => {
        const verifyOwner = await PostModel.findOneComment(req.params.id);

        if (req.currentUser.id != verifyOwner[0].comment_user && req.currentUser.role != 'Admin') {
            throw new HttpException(401, 'Access denied, not owner of the comment')
        }

        const result = await PostModel.deleteComment(req.params.id);
        if (!result) {
            throw new HttpException(404, 'Comment not found');
        }
        res.send('Comment has been deleted')
    }

    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            console.log(errors.array());
            throw new HttpException(400, 'validation faild', errors);
        }
    }
}

module.exports = new PostController;