document.addEventListener('DOMContentLoaded', function () {
  const bookContainer = document.querySelector("#book-container");
  const bookURL = 'http://localhost:3000/books'

  fetch(`${bookURL}`)
      .then( response => response.json() )
      .then( bookData => bookData.forEach(function(book) {
        bookContainer.innerHTML += `
        <div id=${book.id}>
          <h2>${book.title}</h2>
          <h4>Author: ${book.author}</h4>
          <img src="${book.coverImage}" width="333" height="500">
          <p>${book.description}</p>
          <button data-id="${book.id}" id="edit-${book.id}" data-action="edit">Edit</button>
          <button data-id="${book.id}" id="delete-${book.id}" data-action="delete">Delete</button>
        </div>`
      }))

  const bookForm = document.querySelector('#book-form');
  bookForm.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(e.target)
  })

  const titleInput = bookForm.querySelector('#title').value
  const authorInput = bookForm.querySelector('#author').value
  const coverImageInput = bookForm.querySelector('#coverImage').value
  const descInput = bookForm.querySelector('#description').value

  fetch(`${bookURL}`, {
    method: 'POST',
    body: JSON.stringify({
      title: titleInput,
      author: authorInput,
      coverImage: coverImageInput,
      description: descInput
    }),
    headers: {
      'Content-Type': 'apllication.json'
    }
  })
  .then( response => response.json())
  .then( book => {
          bookContainer.innerHTML += `
          <div id=${book.id}>
            <h2>${book.title}</h2>
            <h4>Author: ${book.author}</h4>
            <img src="${book.coverImage}" width="333" height="500">
            <p>${book.description}</p>
            <button data-id="${book.id}" id="edit-${book.id}" data-action="edit">Edit</button>
            <button data-id="${book.id}" id="delete-${book.id}" data-action="delete">Delete</button>
          </div>`
  })
})
