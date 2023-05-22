

// The following function is called when the user clicks on the "Add Book" button on the homepage.
// This function will add the book to the user's dashboard.
const addBooks = document.querySelectorAll('#addbookBtn');
addBooks.forEach((addBooks) => {
  addBooks.addEventListener('click', (event) => {
    event.preventDefault();
    const id = addBooks.getAttribute('data-id');
    const book_title = addBooks.getAttribute('data-title');
    const book_author = addBooks.getAttribute('data-author');
    const book_image = addBooks.getAttribute('data-image');
    const user_id = addBooks.getAttribute('data-user');
    const bookData = {
        id,
        book_title,
        book_author,
        book_image,
        user_id
    };
    console.log(bookData);
    fetch('/api/books', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
    })
  });
});