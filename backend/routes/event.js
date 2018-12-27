let express = require('express');
let router = express.Router();
let middleware = require('../middleware');
let eventController = require("../controllers/eventController");

/*
    CURRENTLY ONLY ONE EVENT AVAILABLE -> DATA
 */

router.get('/', middleware.checkToken, middleware.isAdmin, eventController.all_events_get);
router.delete('/', middleware.checkToken, middleware.isAdmin, eventController.all_events_delete);
router.post('/', middleware.checkToken, middleware.isAdmin, eventController.single_event_post);
router.put('/:event_id', middleware.checkToken, middleware.isAdmin, eventController.single_event_put);

 /*
    END EVENT DATA
 */

 /*
    SINGLE EVENT
  */
router.get('/:event_id', middleware.checkToken, middleware.isAdmin, eventController.single_event_get);
router.delete('/:event_id', middleware.checkToken, middleware.isAdmin, eventController.single_event_delete);

module.exports = router;
