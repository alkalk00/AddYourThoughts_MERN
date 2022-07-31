const router = require('express').Router();
const controllers = require('../controllers/users')

router.post('/singup',controllers.signup);
router.post('/signin',controllers.signin);

module.exports = router;