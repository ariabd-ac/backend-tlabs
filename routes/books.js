var express = require('express');
const { body } = require('express-validator');
var router = express.Router();

const booksController = require('../controllers/books');

// [Post] : v1/books/post

router.post(
  '/post',
  [body('title').isLength({ min: 1 }).withMessage('UDAH GUA')],
  booksController.createBook
);

// v1/books
router.get('/', booksController.getAllBooks);

// v1/books/${id}
router.get('/:postId', booksController.getBooksById);

// v1/books/post/${id}
router.put(
  '/post/:postId',
  [body('title').isLength({ min: 1 }).withMessage('input min 5')],
  booksController.updateBooks
);

// v1/books/post/${id}
router.delete('/post/:postId', booksController.deleteBooks);

module.exports = router;
