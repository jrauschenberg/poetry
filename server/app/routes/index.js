'use strict';
var router = require('express').Router();
var natural = require('natural');
module.exports = router;

// router.use('/members', require('./members'));

router.use('/words', require('./words'));
router.use('/poems', require('./poems'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
