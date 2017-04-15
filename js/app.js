
//var HANGUL_DICTIONARY = require('./hangul.js' )


let romanInput = document.querySelector('#roman_input'),
    hangulOutput = document.querySelector('#hangul_output'),
    focusGuard1 = document.querySelector('#focusguard-1'),
    focusGuard2 = document.querySelector('#focusguard-2'),
    copyGT = document.querySelector('#copy_gt'),
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
    hangulOutput.value = romanInput.value == "/?" ? `ctrl+shift : copy hangul to Google translate \ntab : copy hangul to clipboard \noriginal script : http://gimite.net/roman2hangul/` : hangul 
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


window.addEventListener('load', _ => {
    onRomanChanged()
    romanInput.addEventListener('keyup', onRomanChanged)
    romanInput.addEventListener('keydown', e => {
        pressedKeys.push(e.keyCode)
        if(pressedKeys[0] == 17 && pressedKeys[1] == 16) {
            pressedKeys = []
            window.open(`https://translate.google.com/?hl=en#ko/en/${hangulOutput.value}`)
        }
    })
    tabAutoCopy()
    copyGT.addEventListener('click', _ => window.open(`https://translate.google.com/?hl=en#ko/en/${hangulOutput.value}`))
    copyClipboard.addEventListener('click', copyToClipboard)
})
    