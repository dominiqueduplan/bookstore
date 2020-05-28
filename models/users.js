let mongoose = require("mongoose");

let connection = mongoose.connect('mongodb://localhost:27017/bookstore', {useNewUrlParser: true});
mongoose.connection.on('connected', () => {
    console.log("Mongo connecté");
});

mongoose.connection.on('error', err => {
    console.log(err);
});

var UserSchema = new mongoose.Schema(
    { 
        email: 'string', 
        password: 'string', 
    });

var UserModel = mongoose.model('User', UserSchema);


const login = (email, password, callback) => {
    
    UserModel.findOne({email,password}, (err, user)=>{
        if (err || !user) return callback(err || new Error("pas de user"))
        return callback(null,user)
    })
}

module.exports = { login }