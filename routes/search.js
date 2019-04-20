const express = require('express');
const router = express.Router();
const {Fetcher} = new require('../core/services/fetcher');
const fetcher = new Fetcher();

router.get('/', function(req, res, next) {
    const {keywords} = req.params;
    if ( keywords ) {
        // Find all the parts matching these keywords
    } else {
        // Return top 5 parts
        fetcher.fromKeywords()
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((err) => {
                res.status(500).send(err);
            });
    }
});

module.exports = router;
