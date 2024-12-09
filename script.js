class Library {
    #library = [];

    addBook = (book) => {
        this.#library.push(book);
    }

    removeBook = (book) => {
        // this.#library.splice(indexOf(book), 1);
        console.log(book);
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

    toggleReadStatus() {
        this.isRead = !this.isRead;
    }
}

class Card {
    #title;
    #author;
    #pages;
    isRead;
    constructor(title, author, pages, isRead) {
        super(title, author, pages, isRead);
    }

    initializeCard() {
        const cardContainer = document.querySelector(".card-container");
        cardContainer.replaceChildren();
        const card = document.createElement("div");
        // Add styling Class
        card.classList.add("card");
        return card;
    }

    initializeContent(card) {
        // Set up info in the card
        const title = document.createElement("h3");
        title.textContent = this.#title;
        const author = document.createElement("p");
        author.textContent = `written by ${this.#author}`;
        const pages = document.createElement("p");
        pages.textContent = `${this.#pages} pages`;
        const isRead = document.createElement("p");
        if (book.isRead) {
            isRead.textContent = "Read ✔";
        } else {
            isRead.textContent = "Not read ✘";
        }
        // Append info
        card.append(title);
        card.append(author);
        card.append(pages);
        card.append(isRead);
        card.append(btnContainer);
    }

    insertCard(card) {
        // Insert card
        const cardContainer = document.querySelector(".card-container");
        cardContainer.append(card);
    }

}



const displayBooks = (library) => {
    
    library.listBooks().forEach(book => {
        const card = Card.initializeCard();
        Card.initializeContent(card);
        Card.insertCard(card);


        
        // card.dataset.index = library.indexOf(book);
        
        // //Set up button div
        // const btnContainer = document.createElement("div");
        // btnContainer.classList.add("btn-container");
        // // Set up read button
        // const toggleReadBtn = document.createElement("button");
        // toggleReadBtn.classList.add("toggle-read-btn");
        
        // if (book.isRead) {
        //     toggleReadBtn.textContent = "Unread";
        //     toggleReadBtn.classList.add("unread");
        // } else {
        //     toggleReadBtn.textContent = "Read";
        //     toggleReadBtn.classList.add("read");
        // }
        
        // toggleReadBtn.addEventListener("click", () => {
        //     book.toggleReadStatus();
        //     displayBooks(library);
        // })
        // // Set up remove button
        // const removeBtn = document.createElement("button");
        // removeBtn.textContent = "Remove";
        // removeBtn.classList.add("remove-btn");
        // removeBtn.addEventListener("click", () => {
        //     library.removeBook(book);
        //     displayBooks(library);
        // })

        // // Append buttons to btn container
        // btnContainer.append(toggleReadBtn);
        // btnContainer.append(removeBtn);


        

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