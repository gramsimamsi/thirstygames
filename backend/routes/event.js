let express = require('express');
let router = express.Router();
let eventController = require("../controllers/eventController");

/*
    CURRENTLY ONLY ONE EVENT AVAILABLE -> DATA
 */

router.get('/', eventController.all_events_get);
router.delete('/', eventController.all_events_delete);
router.post('/', eventController.single_event_post);
router.put('/:event_id', eventController.single_event_put);

 /*
    END EVENT DATA
 */

 /*
    SINGLE EVENT
  */
router.get('/:event_id', eventController.single_event_get);
router.delete('/:event_id', eventController.single_event_delete);

module.exports = router;
