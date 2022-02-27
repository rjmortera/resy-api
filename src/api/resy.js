const express = require('express');
const request = require('request-promises');
const router = express.Router();

router.get('/', (req, res) => {
    const { location, slug } = req.query;
    if (!location || !slug) {
        return res.status(400).json({
            error: 'You must provide a location and a slug.'
        });
    }

    getVenue(slug, location)
        .then(id => {
            res.json({
                // slug: slug,
                // location: location,
                venueId: id,
                exampleFormat: `${new Date().toISOString().split('T')[0]},2,${id}`
            });
        })
        .catch(() => {
            res.status(404).json({
                error: "Couldn't find a venue with that slug and location."
            });
        });
});

const getVenue = async (slug, location) => {

    const response = await request({
        url: `https://api.resy.com/3/venue?url_slug=${slug}&location=${location}`,
        headers: {
            'authority': 'api.resy.com',
            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"',
            'x-origin': 'https://resy.com',
            'sec-ch-ua-mobile': '?0',
            'authorization': 'ResyAPI api_key="VbWk7s3L4KiK5fzlO7JD3Q5EYolJI7n5"',
            'accept': 'application/json, text/plain, */*',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36',
            'cache-control': 'no-cache',
            'sec-ch-ua-platform': '"Windows"',
            'origin': 'https://resy.com',
            'sec-fetch-site': 'same-site',
            'sec-fetch-mode': 'cors',
            'sec-fetch-dest': 'empty',
            'referer': 'https://resy.com/',
            'accept-language': 'en-US,en;q=0.9'
        },
        gzip: true
    });
    return JSON.parse(response.body).id.resy;
};

module.exports = router;
