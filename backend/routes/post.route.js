const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const postController = require("../controllers/post.controller");
const awaitHandleFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createPostSchema, updatePostSchema, createCommentSchema, updateCommentSchema } = require('../middleware/validators/postValidator.middleware');

router.get('/', auth(), awaitHandleFactory(postController.getAllPosts));
router.delete('/id/:id', auth(), awaitHandleFactory(postController.deletePost))
router.post('/', auth(), createPostSchema, awaitHandlerFactory(postController.createPost));
router.patch('/id/:id', auth(), updatePostSchema, awaitHandlerFactory(postController.updatePost))

router.delete('/like/delete', auth(), awaitHandleFactory(postController.deleteLike))
router.patch('/like/:id', auth(), awaitHandleFactory(postController.updateLike))
router.post('/like', auth(), awaitHandleFactory(postController.createLike));
router.get('/like/get/:id', auth(), awaitHandleFactory(postController.getLike))

router.post('/comment', auth(), createCommentSchema, awaitHandlerFactory(postController.createComment));
router.get('/comment/id/:id', auth(), awaitHandlerFactory(postController.getComment))
router.delete('/comment/id/:id', auth(), awaitHandlerFactory(postController.deleteComment))
router.patch('/comment/id/:id', auth(), updateCommentSchema, awaitHandlerFactory(postController.updateComment))

module.exports = router;