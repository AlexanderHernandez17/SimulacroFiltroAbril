const mongoose = require('mongoose');
let User

const connectDatabase = async () => {
    try {
        if (!User) {
            User = mongoose.model('User', require('../models/userModel').Schema);

            await mongoose.connect('mongodb+srv://alexanderhdez2001:av4Fh5IvYYLNT9Kz@cluster0.8scgkak.mongodb.net/')
            .then(()=> console.log('Connected to mongodb server'))
            .catch((error)=> console.log('failed to connect to mongodb server'));

            
        }
        
    } catch (error) {
        console.error('failed to connect to mongodb server', error);
        
    }
};


module.exports = connectDatabase

