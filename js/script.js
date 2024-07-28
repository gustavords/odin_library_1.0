//dummy data
const myLibrary = [{
    title: `book 1`,
    author: `author 1`,
    pages: `777`,
    read: false,
    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
    },
    id: 0,
},
{
    title: `book 2`,
    author: `author 2`,
    pages: `666`,
    read: true,
    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
    },
    id: 1,
},
{
    title: `book 3`,
    author: `author 3`,
    pages: `555`,
    read: false,
    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
    },
    id: 2,
}];

function Book(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages
    this.read = read;
    this.info = () => {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
    };
    this.id = id;
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

    newBook.id = myLibrary.length;

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
        bookBody.setAttribute(`id`, `${book.id}`);

        const bookInfo = document.createElement(`div`)
        const bookOptions = bookInfo.cloneNode(false);
        bookInfo.classList.add(`book-info`);
        bookOptions.classList.add(`book-options`);

        const title = document.createElement(`p`);
        title.textContent = `${book.title}`;

        const author = title.cloneNode();
        author.textContent = `by ${book.author}`;

        const pages = title.cloneNode();
        pages.textContent = `${book.pages} pages`;

        const readLbl = document.createElement(`label`);
        readLbl.setAttribute(`for`, `${book.id}-read`);
        readLbl.classList.add(`read-toggle`);
        const readSpan = document.createElement(`span`);

        const read = document.createElement(`input`);
        read.setAttribute(`type`, `checkbox`);
        read.setAttribute(`id`, `${book.id}-read`);
        read.classList.add(`read-checkbox`);
        read.checked = book.read;



        const remove_btn = document.createElement(`button`);
        remove_btn.classList.add(`remove-btn`);
        remove_btn.classList.add(`button`);
        remove_btn.textContent = `remove`;

        // const edit_btn = remove_btn.cloneNode(false);
        // edit_btn.textContent = `edit`;


        bookInfo.appendChild(title);
        bookInfo.appendChild(author);
        bookInfo.appendChild(pages);
        bookInfo.appendChild(read);
        readLbl.appendChild(readSpan)
        bookInfo.appendChild(readLbl);
        bookBody.appendChild(bookInfo);

        // bookOptions.appendChild(edit_btn);
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
const add_book_dialogue = document.querySelector(`#add-book-dialogue`);
const add_dialogue_btn_group = add_book_dialogue.querySelectorAll(".add-book-btn-group");
const book_option_buttons = document.querySelector(`.library`);//<---parent node for bubbling due to generated dom


function modalRemoveBtnEventListener(event) {
    //find article tag index position (books of library) in display's library NodeLIst
    //target parent parent of button for node position 
    const index = event.target.parentNode.parentNode.id;
    myLibrary.splice(index, 1);

    //remap id to new standing
    for (let i = 0; i < myLibrary.length; i++) {
        myLibrary[i].id = i;
    }

    displayLibrary();
};

function updateBookRead(event) {
    const index = event.target.parentNode.parentNode.id;
    myLibrary[index].read = event.target.checked;
}

// show-modal/static-page event listeners
add_book_btn.addEventListener(`click`, (e) => {
    add_book_dialogue.showModal();
});

// dialog/modal event listeners
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
            const formElements = document.querySelectorAll(`#add-book-form>div>input`)
            formElements.forEach((element) => {
                arr.push(element.value != ``);
            });

            let formNotFilled = arr.includes(false);

            if (formNotFilled === true) {
                console.log(`not all fields have been filled`)
            }
            else {
                //get data from form
                processForm();
                displayLibrary();
            }

        }

    })
});

// book-cards event listeners
book_option_buttons.addEventListener(`click`, (e) => {

    if (e.target.classList[0] === `remove-btn`) {
        modalRemoveBtnEventListener(e);
    }

    if (e.target.classList[0] === `read-checkbox`) {
        console.log(e.target);
        updateBookRead(e);
    }


})

displayLibrary();