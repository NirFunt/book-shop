'use strict'

var gBooks;
const BOOK_PER_PAGE = 3;
var gPage = 0;

_createBooks();

function getBooks() {
    return gBooks.slice(gPage * BOOK_PER_PAGE, gPage * BOOK_PER_PAGE + BOOK_PER_PAGE);
}

function createBook(name, price) {
    const DEAFULT_IMAGE = 'https://media.istockphoto.com/photos/blue-book-picture-id1281955543?b=1&k=20&m=1281955543&s=170667a&w=0&h=ZmwacrjQewEU3RqJLYufA-Bi7JVOI2JgcB8X0o7vPeI=';
    var book = _createBook(name, price, DEAFULT_IMAGE, 'no info');
    gBooks.push(book);
    _saveBooksToLocalStorage();
}

function removeBook(bookId) {
    var index = gBooks.findIndex(book => book.id === bookId);
    gBooks.splice(index, 1);
    _saveBooksToLocalStorage();
}

function updateBook(bookId, newPrice) {
    var book = getBookbyId(bookId);
    book.price = newPrice;
    _saveBooksToLocalStorage();
}

function SetRate(bookId, rateInput) {
    var book = getBookbyId(bookId);
    book.rate = rateInput;
    _saveBooksToLocalStorage();
}

function sortByTitle () {
    gBooks.sort((b1, b2) => b1.name.localeCompare(b2.name));
}

function sortByPrice() {
    gBooks.sort((b1, b2) => b1.price - b2.price);
}

function imageUpdate(bookId, imgLink) {
    var book = getBookbyId(bookId);
    book.imgUrl = imgLink;
    _saveBooksToLocalStorage();
}

function movePrev() {
    if (gPage === 0) return;
    gPage--;
}

function moveNext() {
    if ((gPage + 1) * BOOK_PER_PAGE >= gBooks.length) return;
    gPage++;
}

function getBookbyId(bookId) {
    return gBooks.find(book => book.id === bookId);
}

function _createBooks() {
    gBooks = _loadBooksFromLocalStorage();
    if (!gBooks || gBooks.length === 0) {
        var book1 = _createBook('Fire & Blood', 9.99, 'https://m.media-amazon.com/images/I/51vs20TdtLS.jpg', makeLorem());
        var book2 = _createBook('The World of Ice & Fire', 19.99, 'https://m.media-amazon.com/images/I/51gJ7B9oGKL.jpg', makeLorem());
        var book3 = _createBook('a Knight of the Seven Kindoms', 12.99, 'https://m.media-amazon.com/images/I/51gt34HUd9L.jpg', makeLorem());
        gBooks = [book1, book2, book3];

        var book4 = _createBook('The Fellowship of the Ring', 11.96, 'https://target.scene7.com/is/image/Target/GUEST_64eccd05-5642-4cff-9c13-564742d3778a?wid=488&hei=488&fmt=pjpeg', makeLorem());
        var book5 = _createBook('The Two Towers', 12.99, 'https://images-na.ssl-images-amazon.com/images/I/919-2hQNB6L.jpg', makeLorem());
        var book6 = _createBook('The Return of the King', 12.99, 'https://images-na.ssl-images-amazon.com/images/I/91m8vgNyhBL.jpg', makeLorem());
        var book7 = _createBook('a Feast For Crows', 12.99, 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/0064/9780006486121.jpg', makeLorem());
        gBooks.push(book4); gBooks.push(book5); gBooks.push(book6); gBooks.push(book7);
        _saveBooksToLocalStorage();
    }
}

function _createBook(name, price, imgurl, info) {
    var book = {
        id: makeId(),
        name: name,
        price: price,
        imgUrl: imgurl,
        info: info,
        rate: 5
    }
    return book;
}

function _saveBooksToLocalStorage() {
    saveToLocalStorage('booksDB', gBooks);
}

function _loadBooksFromLocalStorage() {
    return loadFromLocalStorage('booksDB');
}