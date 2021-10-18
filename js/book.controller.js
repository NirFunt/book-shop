'use strict'

function init() {
    renderBooks();
}

function renderBooks() {
    var books = getBooks();
    var booksHTMLarray = books.map(book => {
        var bookHTML = `
        <div class="book">
            <div class="book-id">${book.id}</div>
            <div class="book-img"> <img src="${book.imgUrl}" onclick="onImgClick('${book.id}')"></div>
            <div class="book-title">${book.name}</div>
            <div class="book-price">${book.price}</div>
            <div class="book-actions">
                <button class="read" onclick="onRead('${book.id}')">Read</button>
                <button class="update" onclick="onShowUpdateBookModal('${book.id}')">Update</button>
                <button class="delete" onclick="onRemove('${book.id}')">Delete</button>
            </div>
        </div>
                    `
        return bookHTML;
    });
    var elBooksContainer = document.querySelector('.books-content');
    elBooksContainer.innerHTML = booksHTMLarray.join('');
}

function onShowCreateBookModal() {
    document.querySelector('.create-new-modal').style.display = 'block';
    document.querySelector('.name-input').value = '';
    document.querySelector('.price-input').value = '';
}

function onCreateBook() {
    if (!document.querySelector('.name-input').value || !document.querySelector('.price-input').value) {
        closeCreateModal();
        return;
    }
    var name = document.querySelector('.name-input').value;
    var price = document.querySelector('.price-input').value;
    createBook(name, price);
    renderBooks();
    closeCreateModal();
}

function onShowUpdateBookModal(bookId) {
    var book = getBookbyId(bookId);
    document.querySelector('.update-modal').style.display = 'block';
    document.querySelector('.update-price-input').value = book.price;
    document.querySelector('.update-btn').id = bookId;
}

function onUpdateBook(bookId) {
    var newPrice = document.querySelector('.update-price-input').value;
    updateBook(bookId, newPrice);
    renderBooks();
    closeUpdateModal();
}

function onRemove(bookId) {
    var isConfirm = confirm('are you sure you want to delte ' + getBookbyId(bookId).name + ' ?');
    if (!isConfirm) return;
    removeBook(bookId);
    renderBooks();
}

function onRead(bookId) {
    var book = getBookbyId(bookId);
    var elInfoModal = document.querySelector('.book-details');
    var elSetRate = elInfoModal.querySelector('.set-rate-btn');
    elInfoModal.style.display = 'block';
    elInfoModal.querySelector('.book-info').innerHTML = `<img src="${book.imgUrl}"> <p>${book.info}</p>`
    elInfoModal.querySelector('.rate-input').value = book.rate;
    elSetRate.id = `${bookId}`; //inject to set-rate-btn bookId, by id attribute
}

function onSetRate(bookId) {
    var rateInput = document.querySelector('.rate-input').value;
    SetRate(bookId, rateInput);
    renderBooks();
    closeDetailModal();
}

function closeDetailModal() {
    document.querySelector('.book-details').style.display = 'none';
}

function closeCreateModal() {
    document.querySelector('.create-new-modal').style.display = 'none';
}

function closeUpdateModal() {
    document.querySelector('.update-modal').style.display = 'none';
    document.querySelector('.update-price-input').value = '';
}


function onSortTitle() {
    sortByTitle();
    renderBooks();
}

function onSortPrice() {
    sortByPrice();
    renderBooks();
}

function onPagePrev() {
    movePrev();
    renderBooks();
}

function onPageNext() {
    moveNext ();
    renderBooks();
}

function onImgClick(bookId) {
    var imgLink = prompt('Image link?');
    if (!imgLink) return;
    imageUpdate(bookId, imgLink);
    renderBooks();
}
