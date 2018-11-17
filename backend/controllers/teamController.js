let express = require('express');
let router = express.Router();
let teamController = require("../controllers/teamController");


router.get('/getScore', teamController.score_get);
router.post('/resetCounter', teamController.counter_reset_post)


