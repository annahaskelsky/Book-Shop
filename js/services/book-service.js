'use strict'

const KEY = 'bookDB'
const PAGE_SIZE = 5
var gPageIdx = 0
var gActivePage = 0
var gSortBy = 'none'
var gBookIdForUpdate


var gBooks
var gBookNames = ['Harry Potter', 'Lord Of The Rings', 'Don Quixote', 'Alice\'s Adventures in Wonderland', 'Pinocchio', 'The Great Gatsby', 'Moby Dick', 'War and Peace', 'Hamlet', 'Pride and Prejudice', 'Crime and Punishment', 'Lord of the Flies']

_createBooks()

function sortBy(opt) {
    gSortBy = opt
}

function getNumOfPages() {
    return Math.ceil(gBooks.length / PAGE_SIZE)
}

function setIdForUpdate(bookId) {
    gBookIdForUpdate = bookId
}

function getBookIdForUpdate() {
    return gBookIdForUpdate
}

function updateRating(bookName, newRating) {
    var book = gBooks.find(function (book) {
        return bookName === book.name
    })
    book.rating = newRating
    _saveBooksToStorage()
}

function getBookNames() {
    return gBookNames
}

function getActivePage() {
    return gActivePage
}

function moveToPage(pageNum) {
    console.log(pageNum);
    gPageIdx = pageNum
    gActivePage = pageNum
}

function changePage(isNext) {
    var numOfPages = getNumOfPages()
    if (gPageIdx === numOfPages - 1 && isNext || !gPageIdx && !isNext) return
    if (isNext) gPageIdx++
    else gPageIdx--
    gActivePage = gPageIdx
    if (isNext && gPageIdx * PAGE_SIZE >= gBooks.length) gPageIdx = 0
}

function getBooks() {
    var startIdx = gPageIdx * PAGE_SIZE
    console.log(gBooks);
    if (gSortBy === 'title') {
        gBooks.sort(function (book1, book2) {
            return (book1.name > book2.name) ? 1 : -1
        })
    } else if (gSortBy === 'price') {
        gBooks.sort(function (book1, book2) {
            return book1.price - book2.price
        })
    }
    return gBooks.slice(startIdx, startIdx + PAGE_SIZE)
}

function deleteBook(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return bookId === book.id
    })
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage()
}

function addBook(bookName, price) {
    var book = _createBook(bookName, price)
    gBooks.unshift(book)
    _saveBooksToStorage()
}

function getBookById(bookId) {
    var book = gBooks.find(function (book) {
        return bookId === book.id
    })
    return book
}

function updateBook(bookId, newPrice) {
    var book = gBooks.find(function (book) {
        return bookId === book.id
    })
    book.price = newPrice
    _saveBooksToStorage()
}

function _createBook(bookName, price) {
    return {
        id: makeId(),
        name: bookName,
        price: price || getRandomIntInclusive(10, 30),
        rating: 0,
        desc: makeLorem()
    }
}

function _createBooks() {
    var books = loadFromStorage(KEY)
    if (!books || !books.length) {
        books = []
        gBookNames.forEach(function (bookName) {
            books.push(_createBook(bookName))
        })
    }
    gBooks = books
    _saveBooksToStorage()
}

function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks)
}