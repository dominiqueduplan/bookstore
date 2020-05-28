const express = require('express')
let fs = require("fs")
let path = require("path")
var bodyParser = require("body-parser")
let Products = require("./models/products")
let Users = require("./models/users")

const app = express()
const port = 8080

app.use(express.static('public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs")
app.set("views", path.join(__dirname,"views"))


app.get('/', (req, res) => {
    Products.getAllProducts((err,products) => {
        if (err) return res.send('erreur')
        res.render('homepage',{products: products})
    })
})

function connected(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
      
    if (email!="" && password!="") {
        Users.login(email, password, (err,user) => {
            if (err) return res.send({"error_text":"incorrect_password"})
            next();
        })
    } else {
        return res.send({"error_text":"need_connection"})    
    }
    
}

app.post('/order/:id', connected, (req, res) => {
    
    var id = req.params.id
 

    Products.orderProductById(id, (err, commande) => {
        if (err) return res.send({"error_text":"erreur dans la commande"});
        return res.send({"error_text":"commande terminée "+ commande})
    })
})

app.listen(port, () => console.log(`Serveur lancé sur le port ${port}`))