// book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}
// UI constructor
function UI() { }


// add book to list 
UI.prototype.addBookToList = function (book) {
  // console.log(book);
  const list = document.getElementById('book-list');
  // create tr element 
  const row = document.createElement('tr');
  // console.log(row);
  // insert cols 
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>
  `;

  list.appendChild(row);
}
// show alert 
UI.prototype.showAlert = function (message, className) {
  // create a div
  const div = document.createElement('div');
  // add classes 
  div.className = `alert ${className}`;
  // add text 
  div.appendChild(document.createTextNode(message));
  // get a parent 
  const container = document.querySelector('.container');
  // get form 
  const form = document.querySelector('#book-form');
  //! insert alert 
  container.insertBefore(div, form);
  // timeout after 3 sec 
  setTimeout(function () {
    document.querySelector('.alert').remove();
  }, 3000);

}
// delete book 
UI.prototype.deleteBook = function (target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }

}

// clear fields 
UI.prototype.clearFields = function () {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}



// event listners for add book
document.getElementById('book-form').addEventListener('submit',
  function (e) {
    // get form values
    const title = document.getElementById('title').value,
      author = document.getElementById('author').value,
      isbn = document.getElementById('isbn').value;
    // console.log(title, author, isbn);

    // instantianting a book
    const book = new Book(title, author, isbn);

    // instantiate UI 
    const ui = new UI();


    console.log(ui);

    // validate 
    if (title === '' || author === '' || isbn === '') {
      // alert('failed');
      // error alert 
      ui.showAlert('please fill in the words', 'error');
    } else {
      // add book to list 
      ui.addBookToList(book);

      // show succes 
      ui.showAlert('Book Added!', 'success');

      // clear fields
      ui.clearFields();

    }

    e.preventDefault();
  }
);

// event listner for delete a book 
document.getElementById('book-list').addEventListener
  ('click', function (e) {


    // instantiate UI 
    const ui = new UI();

    // delete book 
    ui.deleteBook(e.target);

    // show alert 
    ui.showAlert('Book removed', 'success');

    e.preventDefault();
  });