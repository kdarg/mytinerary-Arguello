const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstname:{type: String, required:true},
    lastname:{type: String, required: true},
    email:{type: String, required:true},
    verifiedEmail:{type:Boolean, required:true},
    uniqueString:{type:String, required:true},
    password:[{type: String, required:true}],
    urlimage:{type: String, required:true},
    country:{type:String, required:true},
    from:{type:Array}
})

const User = mongoose.model('user',userSchema)

module.exports = User