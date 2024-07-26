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

// const theHobbit = new Book(`The Hobbit`, `J.R.R. Tolkien`, 295, false);
// console.log(theHobbit.info());

/** library stuff */

function addBookToLibrary(bookFormNodeList) {

    /**
     * get input variables from a form
     * match inputs to Book Constructor variables
     * create new Book object
     * place book in library
     */
}

function displayLibrary() {
    const library_shelf = document.querySelector(`.library`);

    myLibrary.forEach((book) => {
        const bookBody = document.createElement(`article`);
        bookBody.classList.add(`book`);
        bookBody.textContent = `${book.info()}`;
        library_shelf.appendChild(bookBody);
    });
}




/** Form stuff */
function activateFormModal() {
    const form = document.querySelector(`#form_test`);
    // const items = document.forms.namedItem(`form_test`);
    let data = null;

    form.addEventListener(`submit`, (e) => {

        e.preventDefault();
        data = new FormData(form);

        //1.validate <------------------------------------


        // data.forEach((key, value) => {
        //     console.log(`Key: ${key}  |  Value: ${value}`);
        // });
        // console.log(items[0].value);
        // console.log(e.target[0].value);
        // console.log(e)
        console.table(Array.from(data));
    });

}






/** display modal stuff */

const add_book_btn = document.querySelector(`.add-btn`);
const add_book_dialogue = document.querySelector(`#add-book-dialogue`)
const add_btn_in_dialogue = add_book_dialogue.querySelector(`button`);


add_book_btn.addEventListener(`click`, (e) => {
    add_book_dialogue.showModal();
});

add_btn_in_dialogue.addEventListener(`click`, () => {
    activateFormModal();



    //2.add to Library []


    //3.display to shelf from library[]
    displayLibrary();



    add_book_dialogue.close();
});