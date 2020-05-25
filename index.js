let fs = require("fs")
let path = require("path")

fs.readFile(path.join(__dirname,"products.json"), "utf8", (err,contents) => {
    if (err) return console.log('Erreur de lecture du fichier poducts : ', err)
    try {
        var products = JSON.parse(contents).products ;    
        console.log(products)
    } catch (error) {
        console.log('Erreur parking du fichier products')
    }   
})