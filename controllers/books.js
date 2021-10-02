const { validationResult } = require('express-validator');
const Books = require('../models/books');

exports.createBook = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error('Invalid value');
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  const isbn = req.body.isbn;
  const title = req.body.title;
  const author = req.body.author;
  const publisher_name = req.body.publisher_name;
  const publisher_year = req.body.publisher_year;
  const genre = req.body.genre;
  const synopsis = req.body.synopsis;
  const status = req.body.status;

  const Book = new Books({
    title: title,
    isbn: isbn,
    author: author,
    publisher_name: publisher_name,
    publisher_year: publisher_year,
    genre: genre,
    synopsis: synopsis,
    status: status,
  });

  Book.save()
    .then((result) => {
      res.status(201).json({
        message: 'Create Book Success',
        data: result,
      });
    })
    .catch((err) => {
      console.log('err: ', err);
    });
};

exports.getAllBooks = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = req.query.perPage || 5;
  let totalItems;

  Books.find()
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return Books.find()
        .skip((parseInt(currentPage) - 1) * parseInt(perPage))
        .limit(parseInt(perPage));
    })
    .then((result) => {
      res.status(200).json({
        message: 'Data berhasil di panggil',
        data: result,
        total_data: totalItems,
        per_page: parseInt(perPage),
        current_page: parseInt(currentPage),
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getBooksById = (req, res, next) => {
  const postId = req.params.postId;
  Books.findById(postId)
    .then((result) => {
      if (!result) {
        const error = new Error('Books post tidak ditemukan');
        error.errorStatus = 404;
        throw error;
      }
      res.status(200).json({
        message: 'Data berhasil di panggil!',
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateBooks = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error('Invalid value');
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  const isbn = req.body.isbn;
  const title = req.body.title;
  const author = req.body.author;
  const publisher_name = req.body.publisher_name;
  const publisher_year = req.body.publisher_year;
  const genre = req.body.genre;
  const synopsis = req.body.synopsis;
  const status = req.body.status;
  const postId = req.params.postId;

  Books.findById(postId)
    .then((post) => {
      if (!post) {
        const err = new Error('Books post tidak ditemukan');
        err.errorStatus = 404;
        throw err;
      }

      post.isbn = isbn;
      post.title = title;
      post.author = author;
      post.publisher_name = publisher_name;
      post.publisher_year = publisher_year;
      post.genre = genre;
      post.synopsis = synopsis;
      post.status = status;

      return post.save();
    })
    .then((result) => {
      res.status(200).json({
        message: 'Update succes',
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteBooks = (req, res, next) => {
  const postId = req.params.postId;

  Books.findById(postId)
    .then((post) => {
      if (!post) {
        const err = new Error('Books post tidak ditemukan');
        err.errorStatus = 404;
        throw err;
      }

      return Books.findByIdAndRemove(postId);
    })
    .then((result) => {
      res.status(200).json({
        message: 'delete berhasil',
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};
