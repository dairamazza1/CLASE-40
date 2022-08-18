const mongoose = require('mongoose');
require('dotenv').config();
//dotenv.config();
const { MONGO_URI } = require('../config/globals')
const usuariosCollection = 'usuarios';
try {
  mongoose.connect('mongodb+srv://d:mazza@cluster0.mljceut.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
  }, () => console.log('Base de datos conectada'))
} catch (error) {
  console.log(error);
}



const UsuarioSchema = new mongoose.Schema({
    //firstName: {type: String, required: true, max: 100},
    // lastName: {type: String, required: true, max: 100},
    // email: {type: String, required: true, max: 100},
    username: {type: String, required: true, max: 100},
    password: {type: String, required: true, max: 100}
})

module.exports = mongoose.model(usuariosCollection, UsuarioSchema)