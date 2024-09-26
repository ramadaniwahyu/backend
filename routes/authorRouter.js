const router = require('express').Router()
const authorCtrl = require('../controllers/authorCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.route('/authors')
    .get(auth, authorCtrl.getAuthor)
    .post(auth, authorCtrl.addAuthor)

router.route('/authors/:id')
    .put(auth, authorCtrl.updateAuthor)
    .delete(auth, authorCtrl.deleteAuthor)

module.exports = router;