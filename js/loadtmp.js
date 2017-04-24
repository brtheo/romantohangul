let link = document.querySelector('link[rel="import"]')

if(link.import === null || link.import === undefined) {
    const req = new XMLHttpRequest()
    req.open('GET',link.href, false)
    req.send(null)
    if(req.status === 200 || req.status === 304) {
        let domParser = new DOMParser()
        let template = domParser.parseFromString(req.responseText, 'text/html').querySelector('template')
        importHTML(template)
        
    }
}
else {
    let template = link.import.querySelector('template')
    importHTML(template)
}

function importHTML(template) {
    let app = document.importNode(template.content,true)
    document.querySelector('#app').appendChild(app)
}


