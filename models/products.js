let fs = require("fs")
let path = require("path")

let mongoose = require("mongoose");

let connection = mongoose.connect('mongodb://localhost:27017/bookstore', {useNewUrlParser: true});
mongoose.connection.on('connected', () => {
    console.log("Mongo connecté");
});

mongoose.connection.on('error', err => {
    console.log(err);
});

var ProductSchema = new mongoose.Schema(
    { 
        name: 'string', 
        description: 'string', 
        USD_price: 'Number', 
        EUR_price: 'Number', 
        file_link: 'string', 
        creation_date: 'date', 
        orders_counter: 'Number' 
    });

var ProductModel = mongoose.model('Product', ProductSchema);

const  getAllProducts = (callback) => {
    ProductModel.find({}, callback);
}

const orderProductById = (id, callback) => {
    ProductModel.findOneAndUpdate({"_id": id}, {$inc:{"orders_counter":1}},{new: true}).exec(function(err, product) {
        if (err) return callback(err)
        return callback(null, product.file_link);
    })
    /*getAllProducts((err, products) => {
        ProductModel.findOneAndUpdate({"_id": id}, {$inc:{"order_counter":1}}).exec(function(err, product) {
            if (err) return callback(err)
            return callback(null, true);
        })
        if (err) return callback(err, false);
        var link;
        products.forEach(product => {
            if (product.id == id) {
                product.orders_counter++;
                link = product.file_link;
            }
        });
        let new_products = { "products": products }
        fs.writeFile(path.join(__dirname, "products.json"), JSON.stringify(new_products, null, 4), (err) => {
            if (err) throw err;
            console.log('Commande terminée! Voici votre fichier', link);
            return callback(null, true);
        });
    })*/
}

module.exports = {
    getAllProducts,
    orderProductById
}