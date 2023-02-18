const { shortenUrl, redirectUrl } = require('../controllers/url');

const router = require('express').Router();


router.post('/shorten-url',shortenUrl)
router.get('/urls/:id',redirectUrl)



module.exports = router;