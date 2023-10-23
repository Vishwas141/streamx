const {Register,Login}=require('../controllers/AuthController');
const router=require('express').Router();

router.route('/register').post(Register);
router.route('/login').post(Login);

module.exports=router;