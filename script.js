const myLibrary = ["A", "B"];

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
        const card = document.createElement("article");
        card.style.backgroundColor = "red";
        card.innerText = book;
        cardContainer.append(card);
    })
}

displayBooks(library);