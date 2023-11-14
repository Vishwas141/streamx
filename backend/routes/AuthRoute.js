const {Register,Login,getAllUsers,postMeetings,getById,patchById,getByMeetId,getInviteMeetings}=require('../controllers/AuthController');
const router=require('express').Router();

router.route('/register').post(Register);
router.route('/login').post(Login);
router.route('/all').get(getAllUsers);
router.route('/meetings')
.post(postMeetings)
router.route('/meetings/:id')
    .post(patchById)
    .get(getById);

router.route('/meet/:id')
    .get(getByMeetId)

router.route('/invitemeetings/:id')
    .get(getInviteMeetings)

module.exports=router;