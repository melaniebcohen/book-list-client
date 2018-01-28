'use strict';

var __API_URL__  = 'https://mg-book-app.herokuapp.com';
// var __API_URL__  = 'http://localhost:3000';

(function(module) {
  function Book(rawDataObj) { Object.keys(rawDataObj).forEach(key => this[key] = rawDataObj[key]); }

  Book.all = [];

  // ALL BOOK VIEW
  Book.prototype.toHtml = function() {
    var template = Handlebars.compile($('#all-books-template').text());
    return template(this);
  }

  Book.renderAllBooks = (ctx, next) => {
    $('.all-books').empty();
    Book.all.map(book => $('.all-books').append(book.toHtml()));
    next();
  }

  Book.loadAll = (ctx, next) => {
    Book.all = ctx.results.rows.map(rows => new Book(rows));
    console.log('Books instantiated:',Book.all)
    console.log('Book count:',Book.all.length)
    next();
  }

  Book.fetchAll = (ctx, next) => {
    $.ajax(`${__API_URL__}/api/v1/books`)
      .then(results => {
        ctx.results = results;
        next();
      })
      .catch(err => {
        window.errorView.initErrorPage(err);
      })
  }

  // SINGLE BOOK VIEW
  Book.prototype.singleToHtml = function() {
    var template = Handlebars.compile($('#single-book-template').text());
    return template(this);
  }

  Book.renderSingleBook = (ctx, next) => {
    $('.all-books').hide();
    Book.single.map(book => $('.single-book').append(book.toHtml()));
    next();
  }

  Book.loadSingle = (ctx, next) => {
    Book.single = [];
    Book.single = ctx.results.map(book => new Book(book));
    next();
  }

  Book.fetchSingle = (ctx, next) => {
    $.get(`${__API_URL__}/api/v1/books/${ctx.params.id}`)
      .then(results => {
        ctx.results = results.rows;
        console.log('Single book:',ctx.results);
        next();
      })
      .catch(err => {
        window.errorView.initErrorPage(err);
      })
  }

  // ADD BOOK VIEW
  Book.prototype.addBook = function(){
    $.ajax({
      url: `${__API_URL__}/api/v1/books`,
      method: 'POST',
      data: {
        author: this.author,
        title: this.title,
        isbn: this.isbn,
        image_url: this.image_url,
        description: this.description,
      },
      success: window.location = '/',
    })
  }

  module.Book = Book;
})(window)