class Library {
    #library = [];

    addBook = (book) => {
        this.#library.push(book);
    }

    removeBook = (book) => {
        this.#library.splice(this.#library.indexOf(book), 1);
    }

    listBooks = () => [...this.#library];
}

const myLibrary = new Library();

class Book {
    #title;
    #author;
    #pages;
    isRead;
    constructor(title, author, pages, isRead) {
        this.#title = title;
        this.#author = author;
        this.#pages = pages;
        this.isRead = isRead;
    }

    getBook() {
        return {
            title: this.#title,
            author: this.#author,
            pages: this.#pages,
            isRead: this.isRead
        }
    }

    toggleReadStatus() {
        this.isRead = !this.isRead;
    }
}

class Card {
    constructor(book, onToggleReadStatus, onRemoveBook) {
        this.book = book;
        this.onToggleReadStatus = onToggleReadStatus;
        this.onRemoveBook = onRemoveBook;
        this.parent = document.querySelector(".card-container");
    }

    createCard() {
        const card = document.createElement("div");
        // Add styling Class
        card.classList.add("card");
        // initialize card element inside the Card class
        this.card = card;
    }

    addContent() {
        const bookContent = this.book.getBook();

        const title = document.createElement("h3");
        title.textContent = bookContent.title;

        const author = document.createElement("p");
        author.textContent = `written by ${bookContent.author}`;

        const pages = document.createElement("p");
        pages.textContent = `${bookContent.pages} pages`;

        const isRead = document.createElement("p");
        if (bookContent.isRead) {
            isRead.textContent = "Read ✔";
        } else {
            isRead.textContent = "Not read ✘";
        }

        // Append info
        this.card.append(title);
        this.card.append(author);
        this.card.append(pages);
        this.card.append(isRead);
    }

    addButtons() {
        //Set up button div
        const btnContainer = document.createElement("div");
        btnContainer.classList.add("btn-container");
        
        // Set up read button
        const toggleReadBtn = document.createElement("button");
        toggleReadBtn.classList.add("toggle-read-btn");
        
        if (this.book.isRead) {
            toggleReadBtn.textContent = "Unread";
            toggleReadBtn.classList.add("unread");
            toggleReadBtn.classList.remove("read");
        } else {
            toggleReadBtn.textContent = "Read";
            toggleReadBtn.classList.add("read");
            toggleReadBtn.classList.remove("unread");
        }
        
        toggleReadBtn.addEventListener("click", () => {
            this.onToggleReadStatus();
        })
        // Set up remove button
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("remove-btn");
        removeBtn.addEventListener("click", () => {
            this.onRemoveBook();
        })

        // Append buttons to btn container
        btnContainer.append(toggleReadBtn);
        btnContainer.append(removeBtn);
        this.card.append(btnContainer);
    }

    render() {
        this.createCard();
        this.addContent();
        this.addButtons();
        this.parent.append(this.card);
    }
}

const clearCardContainer = () => {
    const cardContainer = document.querySelector(".card-container");
    cardContainer.replaceChildren();
}

const displayBooks = (library) => {
    clearCardContainer();
    library.listBooks().forEach(book => {
        const onToggle = () => {
            book.toggleReadStatus();
            displayBooks(library);
        }

        const onRemove = () => {
            library.removeBook(book);
            displayBooks(library);
        }

        const card = new Card(book, onToggle, onRemove);
        card.render();
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

myLibrary.addBook(new Book("Elon Musk", "Walter Isaacson", 688, true));
myLibrary.addBook(new Book("Outliers: The Story of Success", "Malcolm Gladwell", 336, false));
displayBooks(myLibrary);