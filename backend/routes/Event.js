const router = require('express').Router();
const { createEvent ,getAllEvent,sendEmail} = require('../controllers/Event'); // Corrected the import statement

// Create an event
router.post('/create_event', createEvent);
router.get("/getevents", getAllEvent);
router.post("/sendmail", sendEmail);


module.exports = router;
