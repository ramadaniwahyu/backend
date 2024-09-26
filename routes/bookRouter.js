const router = require('express').Router()
const bookCtrl = require('../controllers/bookCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.route('/books')
    .get(auth, bookCtrl.getBook)
    .post(auth, bookCtrl.addBook)

router.route('/books/:id')
    .put(auth, bookCtrl.updateBook)
    .delete(auth, bookCtrl.deleteBook)

router.patch('/books/:id/author', auth, bookCtrl.updateAuthor)

module.exports = router;