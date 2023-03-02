const router = require('express').Router();
const apiRoutes = require('./api');
const welcome = require('./main.js');

router.use('/api', apiRoutes);
router.use('/', welcome);

module.exports = router;
