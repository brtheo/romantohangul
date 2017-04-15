let link = document.querySelector('link[rel="import"]')
let template = link.import.querySelector('template')
let app = document.importNode(template.content,true)
document.querySelector('#app').appendChild(app)