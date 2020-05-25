let fs = require("fs")
let path = require("path")

function getAllProducts() {
    fs.readFile(path.join(__dirname,"products.json"), "utf8", (err,contents) => {
        if (err) return console.log('Erreur de lecture du fichier poducts : ', err)
        try {
            var products = JSON.parse(contents).products ; 
            console.log("Bienvenue. Voici les produits disponibles")   
            products.forEach(product => {
                console.log(product.id, "-",product.name,"/",product.EUR_price/100,"/",product.orders_counter)
            });
        } catch (error) {
            console.log('Erreur parking du fichier products')
        }   
    })
}

getAllProducts();