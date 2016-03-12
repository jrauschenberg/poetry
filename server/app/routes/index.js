'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/analysis', require('./analysis'));
router.use('/words', require('./words'));
router.use('/poems', require('./poems'));
router.use('/frequencies', require('./frequencies'));
router.use('/sentiments', require('./sentiments'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
