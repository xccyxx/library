class Library {
    #library = [];

    addBook = (book) => {
        this.#library.push(book);
    };

    removeBook = (book) => {
        this.#library.splice(this.#library.indexOf(book), 1);
    };

    listBooks = () => [...this.#library];
}
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
        };
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
        
        toggleReadBtn.textContent = this.book.isRead ? "Unread" : "Read";
        toggleReadBtn.classList.toggle("read", !this.book.isRead);
        toggleReadBtn.classList.toggle("unread", this.book.isRead);
        
        toggleReadBtn.addEventListener("click", () => {
            this.onToggleReadStatus();
        });
        
        // Set up remove button
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("remove-btn");
        removeBtn.addEventListener("click", () => {
            this.onRemoveBook();
        });

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
        };

        const onRemove = () => {
            library.removeBook(book);
            displayBooks(library);
        };

        const card = new Card(book, onToggle, onRemove);
        card.render();
    });
}

// Add new book button
const setupAddBookBtn = (dialog) => {
    const addBookBtn = document.querySelector(".add-book-btn");
    addBookBtn.addEventListener("click", () => {
        dialog.showModal();
    });
}

const handleForm = (library, dialog) => {
    // Prevent the behaviour of the submission
    const form = document.querySelector(".form-section");
    form.addEventListener("submit", (event) => {
        // Prevent the form to be submitted to backend
        event.preventDefault();

        // Create a FormData object from the form
        const formData = new FormData(form);

        // Convert FormData to a plain object
        const data = Object.fromEntries(formData.entries());

        // Destructure the form data
        let { title, author, pages, isRead } = data;

        // modify isRead
        isRead = isRead === "on";   

        // Add book to library
        library.addBook(new Book(title, author, pages, isRead));
        displayBooks(library);
        form.reset();
        dialog.close();
        });
    }

const setupCloseDialogBtn = (dialog) => {
    // Close dialog button
    const closeDialogBtn = document.querySelector(".close-dialog-btn");
    closeDialogBtn.addEventListener("click", () => {
        dialog.close();
    })
}

const setupAddBookFeature = (library) => {
    const dialog = document.querySelector(".add-book-dialog");
    setupAddBookBtn(dialog);
    handleForm(library, dialog);
    setupCloseDialogBtn(dialog);
}

const init = () => {
    const myLibrary = new Library();
    setupAddBookFeature(myLibrary);
    myLibrary.addBook(new Book("Elon Musk", "Walter Isaacson", 688, true));
    myLibrary.addBook(new Book("Outliers: The Story of Success", "Malcolm Gladwell", 336, false));
    displayBooks(myLibrary);
}

init();