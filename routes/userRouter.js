const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.route('/users')
    .get(auth, authAdmin, userCtrl.getUser)
    .post(auth, authAdmin, userCtrl.addUser)

router.route('/users/:id')
    .get(auth, authAdmin, userCtrl.getOneUser)
    .put(auth, authAdmin, userCtrl.updateUser)
    .patch(auth, authAdmin, userCtrl.activateUser)
    .delete(auth, authAdmin, userCtrl.deleteUser)

router.route('/profile')
    .get(auth, userCtrl.getUserInfo)
    .put(auth, userCtrl.updateUserInfo)

router.post('/login', userCtrl.login)
router.get('/logout', userCtrl.logout)
router.post('/refresh_token', userCtrl.refreshToken)


module.exports = router;