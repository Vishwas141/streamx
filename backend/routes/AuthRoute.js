const {Register,Login,Validate}=require('../controllers/AuthController');
const router=require('express').Router();

router.route('/register').post(Register);
router.route('/login').post(Login);
router.get('/validate', Validate);



module.exports=router;