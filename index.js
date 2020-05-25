let fs = require("fs")
let path = require("path")

fs.readFile(path.join(__dirname,"products.json"), "utf8", (err,contents) => {
  products_list = JSON.parse(contents) ;
  console.log(products_list['products'])
})