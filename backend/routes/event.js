let express = require('express');
let router = express.Router();
let eventController = require("../controllers/eventController");

/*
    CURRENTLY ONLY ONE EVENT AVAILABLE -> DATA
 */
/*
router.get('/', eventController.all_event_get);

router.get('/:id', eventController.single_event_get);
router.post('/:id', eventController.single_event_post);
router.put('/:id', eventController.single_event_put);
*/
 /*
    END EVENT DATA
 */

module.exports = router;
