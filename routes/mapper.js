
/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

const express = require('express');
const router = express.Router();

const Mapper = require('../lib/mapper/Mapper');

const reloadExistTiles = '0';

const tilesImagesPath = process.env.TILES_IMAGES_PATH

function goMapper (req, res) {

    if(req.params.lon && req.params.lat && req.params.zoom) {
    
        let _reloadExistTiles = req.params.reload ? req.params.reload : reloadExistTiles;
        _reloadExistTiles = _reloadExistTiles === '1';
        
        const mapper = new Mapper(
            {
                lon: parseFloat(req.params.lon),
                lat: parseFloat(req.params.lat)
            },
            parseInt(req.params.zoom, 10),
            '../../public/images'
        );

        mapper.start( _reloadExistTiles );
        return {
            result: 'ok',
            message: ''
        };
    }else{
        console.log('wrong Mapper parameters ', req.params);
        return {
            result: 'error',
            message: 'wrong mapper parameters'
        };
    }
    
}

router.get('/', function(req, res) {
    res.send('parameters format: mapper/:lon/:lat/:zoom');
});

router.get('/lon/:lon/lat/:lat/zoom/:zoom', function(req, res) {
    const result = goMapper(req, res);
    res.send(result);
});

router.get('/lon/:lon/lat/:lat/zoom/:zoom/reload/:reload', function(req, res) {
    const result = goMapper(req, res);
    res.send(result);
});

module.exports = router;
