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
    cardContainer.replaceChildren()
    library.forEach(book => {
        const card = document.createElement("div");
        // Add styling Class
        card.classList.add("card")
        // Set up info in the card
        const title = document.createElement("h3");
        title.innerText = book.title;
        const author = document.createElement("p");
        author.innerText = `written by ${book.author}`;
        const pages = document.createElement("p");
        pages.innerText = `${book.pages} pages`;
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
const dialog = document.querySelector(".add-book-dialog");

const addBookBtn = document.querySelector(".add-book-btn");
addBookBtn.addEventListener("click", () => {
    dialog.showModal();
})

// Prevent the behaviour of the submission
const form = document.querySelector(".form-section");
form.addEventListener("submit", (event) => {
    // Prevent the form to be submitted to backend
    event.preventDefault();

    // Extract the form data
    title = document.querySelector(".form-section").elements["title"].value
    author = document.querySelector(".form-section").elements["author"].value
    pages = document.querySelector(".form-section").elements["pages"].value
    isRead = document.querySelector(".form-section").elements["isRead"].checked

    // Add the new book to the arrar and display it
    addBookToLibrary(title, author, pages, isRead);
    displayBooks(myLibrary);
    form.reset();
    dialog.close();
})
// Close dialog button
const closeDialogBtn = document.querySelector(".close-dialog-btn");
closeDialogBtn.addEventListener("click", () => {
    dialog.close();
})


addBookToLibrary("Elon Musk", "Walter Isaacson", 688, true);
addBookToLibrary("Outliers: The Story of Success", "Malcolm Gladwell", 336, false);
displayBooks(myLibrary);