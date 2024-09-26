const mongoose = require('mongoose')
const { Schema } = mongoose;

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    images:{
        type: Object
    },
    year: {
        type: String,
        required: true
    },
    author: [{
        type: Schema.Types.ObjectId,
        ref: 'Authors'
    }],
    description:{
        type: String
    },
    is_published: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Books', bookSchema)