//dummy data
const myLibrary = [{
    title: `book 1`,
    author: `author 1`,
    pages: `777`,
    read: false,
    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
    }
},
{
    title: `book 2`,
    author: `author 2`,
    pages: `666`,
    read: true,
    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
    }
},
{
    title: `book 3`,
    author: `author 3`,
    pages: `555`,
    read: false,
    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
    }
}];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages
    this.read = read;
    this.info = () => {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
    };
}

/** library stuff */
function addBookToLibrary(bookFormData) {
    const newBook = new Book()
    bookFormData.forEach((val, prop) => {
        switch (prop) {
            case `title`: newBook.title = val;
                break;
            case `author`: newBook.author = val;
                break;
            case `pages`: newBook.pages = val;
                break;
            case `read`:
                newBook.read = true;
                break;
        }
    })
    //since formData array object size changes to NOT include check box if unchecked
    if (newBook.read === undefined) newBook.read = false;

    myLibrary.push(newBook);
}

function displayLibrary() {
    const library_shelf = document.querySelector(`.library`);
    const allBooks = document.querySelectorAll(`.book`);

    //unload shelf
    Array.from(allBooks).forEach((book) => {
        book.remove();
    });


    myLibrary.forEach((book) => {
        const bookBody = document.createElement(`article`);
        bookBody.classList.add(`book`);

        const bookInfo = document.createElement(`div`)
        const bookOptions = bookInfo.cloneNode(false);
        bookInfo.classList.add(`book-info`);
        bookOptions.classList.add(`book-options`);

        const title = document.createElement(`p`);
        title.textContent = `${book.title}`;

        const author = title.cloneNode();
        author.textContent = `${book.author}`;

        const pages = title.cloneNode();
        pages.textContent = `${book.pages}`;

        const read = title.cloneNode();
        read.textContent = `${book.read}`
        // bookBody.textContent = `${book.info()}`;

        const edit_btn = document.createElement(`button`);
        edit_btn.textContent = `edit`;
        const remove_btn = edit_btn.cloneNode(false);
        remove_btn.textContent = `remove`;


        bookInfo.appendChild(title);
        bookInfo.appendChild(author);
        bookInfo.appendChild(pages);
        bookInfo.appendChild(read);
        bookBody.appendChild(bookInfo);

        bookOptions.appendChild(edit_btn);
        bookOptions.appendChild(remove_btn);
        bookBody.appendChild(bookOptions);

        library_shelf.appendChild(bookBody);
    });
}

/** Form stuff */
function processForm() {
    const form = document.querySelector(`#add-book-form`);
    const data = new FormData(form);

    //validate || change data format here <-----------------------
    addBookToLibrary(data);
}


/** display modal stuff */

const add_book_btn = document.querySelector(`.add-btn`);
const add_book_dialogue = document.querySelector(`#add-book-dialogue`)
const add_dialogue_btn_group = add_book_dialogue.querySelectorAll(".add-book-btn-group")


add_book_btn.addEventListener(`click`, (e) => {
    add_book_dialogue.showModal();
});

//dialog/modal event listeners
add_dialogue_btn_group.forEach((button) => {
    button.addEventListener(`click`, (e) => {

        //cancel-btn inside dialog
        if (e.target.getAttribute(`id`) === `cancel-btn-dialog`) {
            console.log(e.target.getAttribute(`id`));
            add_book_dialogue.close();
        }

        //add-btn inside dialog
        if (e.target.getAttribute(`id`) === `add-btn-dialog`) {

            //check if forms are filled
            let arr = []
            const formElements = document.querySelectorAll(`#add-book-form > input`)
            formElements.forEach((element) => {
                arr.push(element.value != ``);
            });

            let formNotFilled = arr.includes(false);

            if (formNotFilled === true) {
                console.log(`not all fields have been filled`)
            }
            else {
                //1. get data from form
                processForm();

                //2. format data (after validation)

                //3.display to shelf from library[]
                displayLibrary();
            }

        }

    })
});