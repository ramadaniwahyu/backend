const Author = require('../models/authorModel')

const authorCtrl = {
    getAuthor: async (req, res) => {
        try {
            const authors = await Author.find()

            res.json({
                status: 'success',
                count: authors.length,
                result: authors
            })
            // res.json(authors)
        } catch (err) {
            res.status(500).json({ msg: err.message })
        }
    },
    addAuthor: async (req, res) => {
        try {
            const { name, email } = req.body
            const newAuthor = new Author({
                name, email
            })
            await newAuthor.save()

            res.json({ msg: "New author is saved" })
        } catch (err) {
            res.status(500).json({ msg: err.message })
        }
    },
    updateAuthor: async (req, res) => {
        try {
            const { name, email } = req.body

            await Author.findOneAndUpdate({ _id: req.params.id }, {
                name, email
            })
            console.log({name, email});
            res.json({ msg: "Author is updated" })
        } catch (err) {
            res.status(500).json({ msg: err.message })
        }
    },
    deleteAuthor: async (req, res) => {
        try {
            await Author.findByIdAndDelete(req.params.id)
            // console.log(`Author id = ${req.params.id} is deleted`);
            res.json({ msg: `Author id = ${req.params.id} is deleted` })
        } catch (err) {
            res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = authorCtrl