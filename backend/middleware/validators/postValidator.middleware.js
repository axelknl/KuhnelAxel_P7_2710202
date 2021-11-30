const { body } = require('express-validator');

exports.createPostSchema = [
    body('picture')
        .optional()
        .isLength({ max: 250})
        .withMessage('Picture url is too long'),
    body('description')
        .optional()
        .isLength({ max: 1000})
        .withMessage('Description is too long')
];

exports.updatePostSchema = [
    body('picture')
        .optional()
        .isLength({ max: 250})
        .withMessage('Picture url is too long'),
    body('description')
        .optional()
        .isLength({ max: 1000})
        .withMessage('Description is too long')
];

exports.createCommentSchema =[
    body('message')
        .exists()
        .trim()
        .withMessage('Message can not be empty')
        .isLength({ max: 250})
        .withMessage('Message is too long')
]

exports.updateCommentSchema =[
    body('message')
        .exists()
        .trim()
        .withMessage('Message can not be empty')
        .isLength({ max: 250})
        .withMessage('Message is too long')
]