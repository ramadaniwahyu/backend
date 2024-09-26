const Book = require('../models/bookModel')

class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
       const queryObj = {...this.queryString} //queryString = req.query

       const excludedFields = ['page', 'sort', 'limit']
       excludedFields.forEach(el => delete(queryObj[el]))
       
       let queryStr = JSON.stringify(queryObj)
       queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

    //    gte = greater than or equal
    //    lte = lesser than or equal
    //    lt = lesser than
    //    gt = greater than
       this.query.find(JSON.parse(queryStr))
         
       return this;
    }

    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}
const bookCtrl = {
    getBook: async (req, res) => {
        try {
            const books = await Book.find().populate('category').populate('author')
            res.json({
                status: 'success',
                count: books.length,
                result: books
            })
        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    },
    addBook: async (req, res) => {
        try {
            const {title, year, author, description, category, is_published } = req.body
            const newBook = new Book ({
                title, year, author, description, category, is_published
            })
            await newBook.save()

            res.json({msg: "New book is saved"})
        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    },
    updateBook: async (req, res) => {
        try {
            const {title, year, author, description, category, is_published } = req.body

            await Book.findOneAndUpdate({_id: req.params.id}, {
                title, year, author, description, category, is_published
            })
            res.json({msg: "Book is updated"})
        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    },
    updateAuthor: async (req, res) => {
        try {
            await Book.findOneAndUpdate({_id: req.params.id}, {
                authors: req.body.author
            })
            console.log(req.body)
            res.json({msg: "Book's author is updated"})
        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    },
    deleteBook: async (req, res) => {
        try {
            await Book.findOneAndDelete(req.params.id)
            res.json({msg: "Book is deleted"})
        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    }
}

module.exports = bookCtrl