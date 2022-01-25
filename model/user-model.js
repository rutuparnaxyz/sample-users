const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value.length > 50) {
                throw new Error('Name can not be more than 50 characters.')
            }
        }
    },
    age: {
        type: Number,
        required: true,
        default: 20,
        validate(value) {
            if (value <=20 || value >= 80) {
                throw new Error('Age must be between 20 to 80 years.')
            }
        }
    },
});



const userModel = mongoose.model('user', userSchema)

module.exports = userModel