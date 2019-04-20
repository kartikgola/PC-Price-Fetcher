const express = require('express');
const router = express.Router();
const {Fetcher} = new require('../core/services/fetcher');
const fetcher = new Fetcher();

router.get('/', function(req, res, next) {
    // Return top 1 part
    fetcher.fromKeywords()
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

router.get('/:keywords', function(req, res, next) {
    const {keywords} = req.params;
    // Find all the parts matching these keywords
    res.status(200).send('TBD!' + keywords);
});

module.exports = router;
