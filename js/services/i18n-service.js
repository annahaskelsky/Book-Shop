'use strict'

var gTrans = {
    title: {
        en: 'My Book Shop',
        he: 'חנות הספרים שלי'
    },
    'header-id': {
        en: 'Id',
        he: 'מזהה'
    },
    'header-title': {
        en: 'Title ⇅',
        he: 'שם הספר ⇅'
    },
    'header-price': {
        en: 'Price ⇅',
        he: 'מחיר ⇅'
    },
    'header-rating': {
        en: 'Rating',
        he: 'דירוג'
    },
    'header-actions': {
        en: 'Actions',
        he: 'פעולות'
    },
    'actions-read': {
        en: 'Read',
        he: 'קרא'
    },
    'actions-update': {
        en: 'Update',
        he: 'עדכן'
    },
    'actions-delete': {
        en: 'Delete',
        he: 'מחק'
    },
    'btn-add': {
        en: 'Add Book',
        he: 'הוסף ספר'
    },
    'add-book-title': {
        en: 'Title ',
        he: 'שם הספר'
    },
    'add-book-price': {
        en: 'Price',
        he: 'מחיר'
    },
    'add-book-btn': {
        en: 'Add',
        he: 'הוסף'
    },
    'book-title-placeholder': {
        en: 'Book Title',
        he: 'שם הספר'
    },
    'book-price-placeholder': {
        en: 'Book Price',
        he: 'מחיר הספר'
    },
    'modal-rate': {
        en: 'Rate this book:',
        he: 'דרג את הספר:'
    },
    'rate-btn': {
        en: 'Save',
        he: 'שמור'
    },
    'update-price': {
        en: 'Please enter the new price for',
        he: 'אנא הזן את המחיר המעודכן עבור'
    },
    'update-input': {
        en: 'New Price',
        he: 'מחיר מעודכן'
    },
    'update-price-btn': {
        en: 'Update',
        he: 'עדכן'
    }
}

var gCurrLang = 'en'

function getTrans(transKey) {
    var keyTrans = gTrans[transKey]
    if (!keyTrans) return 'unknown'

    var txt = keyTrans[gCurrLang]
    if (!txt) txt = keyTrans['en']

    return txt
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')

    els.forEach(function (el) {
        console.log(el.dataset.trans);
        var txt = getTrans(el.dataset.trans)
        console.log(txt);
        if (el.nodeName === 'INPUT') el.setAttribute('placeholder', txt)
        else el.innerText = txt
    })
    var prices = document.querySelectorAll('[data-price]')
    console.log('prices', prices);
    prices.forEach(function (price) {
        var num = +price.dataset.price
        price.innerText = formatPrice(num, gCurrLang)
    })
}

function setLang(lang) {
    gCurrLang = lang
}

function formatPrice(num, lang) {
    if (lang === 'he') return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num * 3.21);
    else return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
}

function getCurrLang() {
    return gCurrLang
}
