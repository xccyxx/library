const myLibrary = [];

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.info = function() {
        if (read === true) {
            return `${title} by ${author}, ${author} pages, read.`
        }
        else {
            return `${title} by ${author}, ${author} pages, not read yet.`
        }
    }
}

function addBookToLibrary(title, author, pages, isRead) {
    const newbook = new Book(title, author, pages, isRead);
    myLibrary.push(newbook);
}

const displayBooks = (library) => {
    const cardContainer = document.querySelector(".card-container");
    library.forEach(book => {
        const card = document.createElement("div");
        // Add styling Class
        card.classList.add("card")
        // Set up info in the card
        const title = document.createElement("h3");
        title.innerText = book.title;
        const author = document.createElement("p");
        author.innerText = `Author: ${book.author}`;
        const pages = document.createElement("p");
        pages.innerText = `Pages: ${book.pages}`;
        const isRead = document.createElement("p");
        if (book.isRead) {
            isRead.innerText = "Read";
        } else {
            isRead.innerText = "Not read";
        }

        // Append info
        card.append(title);
        card.append(author);
        card.append(pages);
        card.append(isRead);

        // Insert card
        cardContainer.append(card);
    })
}

// Add new book button
const addBookBtn = document.querySelector(".add-book-btn");
addBookBtn.addEventListener("click", () => {
    const dialog = document.querySelector(".add-book-dialog")
    dialog.showModal();
})


addBookToLibrary("test1", "author1", 300, true);
addBookToLibrary("test2", "author2", 300, false);
displayBooks(myLibrary);