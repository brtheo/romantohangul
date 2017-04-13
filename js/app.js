
//var HANGUL_DICTIONARY = require('./hangul.js' )


var romanInput = document.querySelector('#roman_input')
var hangulOutput = document.querySelector('#hangul_output')
var focusGuard1 = document.querySelector('#focusguard-1')
var focusGuard2 = document.querySelector('#focusguard-2')

function convert(roman) {
    var hangul = []
    var node = HANGUL_DICTIONARY


    for (var i = roman.length - 1; i >= 0; --i) {
    var r = roman[i].toUpperCase()
    var next = node[r]
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


function onRomanChanged() {
    var hangul = convert(romanInput.value)
    hangulOutput.value = hangul 
}

function tabAutoCopy() {
    focusGuard1.addEventListener('focus', _ => hangulOutput.focus())
    focusGuard2.addEventListener('focus', _ => romanInput.focus())
    hangulOutput.addEventListener('focus', _ => {
        hangulOutput.select()
        document.execCommand('copy')
    })


    /*hangulOutput.addEventListener('keyup', e => {
        var tap = 0
        if (e.which == 9) {
            if(tap == 0){
                hangulOutput.select()
                document.execCommand('copy')
                tap++
                console.log(tap)
            }
            else {
                romanInput.select()
                tap = 0
                console.log(tap)
            }
        }
    })*/
    /*hangulOutput.addEventListener('keyup', e => {
        if (e.which == 9) {
            romanInput.focus()
        }
    })*/
}

window.addEventListener('load', _ => {
    onRomanChanged()
    romanInput.addEventListener('input', onRomanChanged)
    tabAutoCopy()
})
    