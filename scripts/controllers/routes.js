'use strict';

page('/', function() {
  page.redirect('/book-list-client');
});
page('/book-list-client', window.Book.fetchAll, window.Book.loadAll, window.Book.renderAllBooks, window.bookView.init);
page('/books/add', window.formView.init);
page('/books/:id', window.Book.fetchSingle, window.Book.loadSingle, window.Book.renderSingleBook, window.singleBook.init,window.Book.deleteBook);
page('/books/:id/edit', window.editBook.init, window.Book.fetchSingle,window.Book.loadSingle, window.Book.renderEditSingleBook, window.Book.updateBook);

page();
