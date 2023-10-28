const router = require('express').Router();
const { createEvent ,getAllEvent,sendEmail,getSingleDetail, getAdmin, editEvent, deleteEvent} = require('../controllers/Event'); // Corrected the import statement

// Create an event
router.post('/create_event', createEvent);
router.get("/getevents", getAllEvent);
router.post("/sendmail", sendEmail);
router.get("/getsingleevent/:id", getSingleDetail);
router.get("/getAdmin", getAdmin);
router.post("/edit/:id", editEvent)
router.delete("/delete/:id", deleteEvent);



module.exports = router;