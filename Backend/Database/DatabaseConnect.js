const mongoose = require('mongoose');
const connectiondb = async() => {
    try {
        await mongoose.connect('mongodb://localhost:27017/mydatabase'); 
          console.log('Database connected');

    } 
    
    catch (error) {
        console.log(error);
    }
}

module.exports = connectiondb;


