const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Book = new Schema(
  {
    isbn: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
    author: {
      type: String,
      required: false,
    },
    publisher_name: {
      type: String,
      required: false,
    },
    publisher_year: {
      type: Number,
      required: false,
    },
    genre: {
      type: String,
      required: false,
    },
    synopsis: {
      type: String,
      required: false,
    },
    status: {
      type: Boolean,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Books', Book);
