'use strict'

function onInit() {
    renderBooks()
    renderPages()
    doTrans()
    var currPage = getActivePage()
    console.log(currPage);
    document.querySelector(`.page-${currPage}`).classList.add('active-page')
}

function onSortBy(opt) {
    sortBy(opt)
    renderBooks()
    doTrans()
}

function renderPages() {
    var elPages = document.querySelector('.pages')
    var numOfPages = getNumOfPages()
    var strHTMLs = ''
    for (var i = 1; i <= numOfPages; i++) {
        strHTMLs += `<div class="page page-${i - 1}" onclick="onMoveToPage(${i - 1}, this)">${i}</div>`
    }
    elPages.innerHTML = strHTMLs
}

function onMoveToPage(pageNum, elPage) {
    var activePage = getActivePage()
    var elActivePage = document.querySelector(`.page-${activePage}`)
    elActivePage.classList.remove('active-page')
    elPage = elPage || document.querySelector(`.page-${pageNum}`)
    elPage.classList.add('active-page')
    moveToPage(+pageNum)
    renderBooks()
    doTrans()
}

function onAddBook() {
    document.querySelector('.add').hidden = true
    document.querySelector('.add-book').hidden = false
}

function onSubmitBook() {
    var elBookName = document.querySelector('[name=title]')
    var elPrice = document.querySelector('[name=price]')
    var bookName = elBookName.value
    var price = elPrice.value
    if (bookName) addBook(bookName, price)
    elBookName.value = ''
    elPrice.value = ''
    document.querySelector('.add-book').hidden = true
    document.querySelector('.add').hidden = false
    renderPages()
    onMoveToPage(0)
    renderBooks()
    doTrans()
}

function renderBooks() {
    var books = getBooks()
    var strHTMLs = ''
    books.forEach(function (book) {
        strHTMLs += `<tr>
        <td>${book.id}</td>
        <td class="book-title">${book.name}</td>
        <td class="book-price" data-price="${book.price}">${book.price}</td>
        <td class="book-rating">${book.rating}/10</td>
        <td class="action-td"><button class="action-btn read" data-trans="actions-read" onclick="onReadBook('${book.id}')">Read</button></td>
        <td class="action-td"><button class="action-btn update" data-trans="actions-update" onclick="onUpdateBook('${book.id}', '${book.name}')">Update</button></td>
        <td class="action-td"><button class="action-btn delete" data-trans="actions-delete" onclick="onDeleteBook('${book.id}')">Delete</button></td>
        </tr>`
    })
    var elTBody = document.querySelector('tbody')
    elTBody.innerHTML = strHTMLs
}

function onDeleteBook(bookId) {
    deleteBook(bookId)
    renderPages()
    var activePage = getActivePage()
    onMoveToPage(activePage)
    renderBooks()
    doTrans()
}

function onUpdateBook(bookId, bookName) {
    document.querySelector('.title-for-update').innerText = bookName
    document.querySelector('.update-modal').style.display = 'block'
    setIdForUpdate(bookId)
}

function onSubmitUpdate() {
    var bookId = getBookIdForUpdate()
    var newPrice = +document.querySelector('[name=new-price]').value
    updateBook(bookId, newPrice)
    document.querySelector('[name=new-price]').value = ''
    document.querySelector('.update-modal').style.display = 'none'
    renderBooks()
    doTrans()
}

function onReadBook(bookId) {
    var book = getBookById(bookId)
    var elModal = document.querySelector('.modal')
    elModal.querySelector('h5').innerText = book.name
    elModal.querySelector('h6').innerText = formatPrice(book.price, getCurrLang())
    elModal.querySelector('img').src = `img/${(book.name).split(' ').join('-')}.jpg`
    elModal.querySelector('p').innerText = book.desc
    elModal.style.display = 'block'
}

function onUpdateRating() {
    var elBookName = document.querySelector('.modal').querySelector('h5').innerText
    var elRating = +document.querySelector('.rating').innerText
    onCloseModal()
    updateRating(elBookName, elRating)
    renderBooks()
    document.querySelector('.rating').innerText = '0'
    doTrans()
}

function onChangePage(isNext) {
    var currPage = getActivePage()
    document.querySelector(`.page-${currPage}`).classList.remove('active-page')
    if (isNext) changePage(true)
    else changePage(false)
    var activePage = getActivePage()
    document.querySelector(`.page-${activePage}`).classList.add('active-page')
    renderBooks()
    doTrans()
}

function onChangeRate(isIncrease) {
    var elRating = document.querySelector('.rating')
    var newRating
    if ((+elRating.innerText === 0 && !isIncrease) || (+elRating.innerText === 10 && isIncrease)) return
    newRating = (isIncrease) ? +elRating.innerText + 1 : +elRating.innerText - 1
    elRating.innerText = newRating
}

function onCloseModal() {
    document.querySelector('.modal').style.display = 'none'
}

function onSetLang(lang) {
    setLang(lang)
    if (lang === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')
    doTrans()
}