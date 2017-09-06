
//var HANGUL_DICTIONARY = require('./hangul.js' )
const USR_LANG = navigator.language || navigator.userLanguage
const KEY = 'trnsl.1.1.20170906T102217Z.3c379ae3269a2640.7eee33443590c00de436803220fcb5feef804df0'
let url = {
    web: `https://www.google.com/search?q=`,
    gt: `https://translate.google.com/?hl=${USR_LANG}#ko/${USR_LANG}/`,
    dictionary: `https://glosbe.com/ko/${USR_LANG}/`,
    yandexApi: `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${KEY}&lang=ko-fr&text=`
}
let romanInput = document.querySelector('#roman_input'),
    hangulOutput = document.querySelector('#hangul_output'),
    translateOutput = document.querySelector('#translate_output'),
    focusGuard1 = document.querySelector('#focusguard-1'),
    focusGuard2 = document.querySelector('#focusguard-2'),
    searchWeb = document.querySelector('#search_web'),
    searchGT = document.querySelector('#search_gt'),
    searchDictionary = document.querySelector('#search_dictionary'),
    copyClipboard = document.querySelector('#copy_clipboard'),
    pressedKeys = []

function convert(roman) {
    let hangul = [],
        node = HANGUL_DICTIONARY


    for (let i = roman.length - 1; i >= 0; --i) {
    let r = roman[i].toUpperCase()
    let next = node[r]
    if (!next && node["$"]) {
        hangul.push(node["$"])
        next = HANGUL_DICTIONARY[r]
    }
    if (!next) {
        if (roman[i] != "-") hangul.push(roman[i])
        next = HANGUL_DICTIONARY
    }
    node = next
    }
    if (node["$"]) hangul.push(node["$"])
    return hangul.reverse().join("")
}


function onRomanChanged(e) {
    pressedKeys = []
    let hangul = convert(romanInput.value)
    if(romanInput.value !== '') 
        translate(hangul)
    hangulOutput.value = romanInput.value == "/?" ? `ctrl+shift : copy hangul to Google translate \ntab : copy hangul to clipboard \noriginal script : http://gimite.net/roman2hangul/\nTranslation Powered by Yandex.Translate` : hangul 
}

function copyToClipboard() {
    hangulOutput.select()
    document.execCommand('copy')
}

function tabAutoCopy() {
    focusGuard1.addEventListener('focus', _ => hangulOutput.focus())
    focusGuard2.addEventListener('focus', _ => romanInput.focus())
    hangulOutput.addEventListener('focus', copyToClipboard)
}

function translate(hangul) {
    console.log(`${url.yandexApi}${hangul}`)
    fetch(encodeURI(`${url.yandexApi}${hangul}`))
        .then(res => res.json())
        .then(data => translateOutput.value = data.text[0])

}


window.addEventListener('load', _ => {
    onRomanChanged()
    romanInput.addEventListener('keyup', onRomanChanged)
    romanInput.addEventListener('keydown', e => {
        pressedKeys.push(e.keyCode)
        if(pressedKeys[0] == 17 && pressedKeys[1] == 16) {
            pressedKeys = []
            window.open(url.gt+hangulOutput.value)
        }
    })
    tabAutoCopy()
    searchWeb.addEventListener('click', _ => window.open(url.web+hangulOutput.value))
    searchGT.addEventListener('click', _ => window.open(url.gt+hangulOutput.value))
    searchDictionary.addEventListener('click', _ => window.open(url.dictionary+hangulOutput.value))
    copyClipboard.addEventListener('click', copyToClipboard)
})
    