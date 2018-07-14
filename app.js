'use strict';

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.querySelector('#book-list');
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">x</a></td>
    `;
    list.appendChild(row);
  }

  showAlert(message, classname) {
    const alertWindow = document.querySelector('#alert');
    alertWindow.classList = `alert ${classname}`;
    alertWindow.innerText = message;
    setTimeout(() => {
      alertWindow.classList = '';
      alertWindow.innerText = '';
    }, 2000);
  }

  deleteBook(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
      return true;
    }
  }

  clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }
}

document.querySelector('#book-form').addEventListener('submit', (e) => {
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;

  const book = new Book(title, author, isbn);
  const ui = new UI();

  if (title === '' || author === '' || isbn === '') {
    ui.showAlert("Fields cannot be blank", "error");
  } else {
    ui.showAlert("Book Added!", "success");
    ui.addBookToList(book);
    ui.clearFields();
    e.preventDefault();
  }
});

document.querySelector('#book-list').addEventListener('click', (e) => {
  const ui = new UI();
  if (ui.deleteBook(e.target)) ui.showAlert("Book Deleted!", "success");
});