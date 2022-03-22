const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/nodeDatabase')

const schema = new mongoose.Schema({
    name : String
})

const Dog = mongoose.model('chiens', schema)

const chibi = new Dog({name: 'toufik'});
chibi.save().then(() => console.log('miaou miaou woaw'))
