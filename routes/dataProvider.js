/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */


const express = require('express');
const router = express.Router();

const DataProvider = require('../lib/mapper/DataProvider');

const ERRORS_MESSAGES = {
    WRONG_PARAMETERS: 'wrong DataProvider parameters, missing: lon, lat, zoom'
}

function getNetworkData (req, res) {

    if(req.params.lon && req.params.lat && req.params.zoom) {

        const dataProvider = new DataProvider(
            {
                lon: parseFloat(req.params.lon),
                lat: parseFloat(req.params.lat)
            },
            parseInt(req.params.zoom, 10)
        );

        if(req.params.layer){
            const layer = dataProvider.generateLayer(req.params.layer)
            return {
                layer,
                result: 'OK',
                message: ''
            };
        }else{
            const layers = dataProvider.generateLayers().getLayers()
            return {
                layers,
                result: 'OK',
                message: ''
            };
        }

    }else{

        console.log('wrong DataProvider parameters ', req.params);
        return {
            result: 'error',
            message: ERRORS_MESSAGES.WRONG_PARAMETERS
        };

    }

}

router.get('/', function(req, res) {
    const result = {
        result: 'error',
        message: ERRORS_MESSAGES.WRONG_PARAMETERS
    };
    res.header("Content-Type", "application/json");
    res.send(result);
});

router.get('/lon/:lon/lat/:lat/zoom/:zoom', function(req, res) {
    const result = getNetworkData(req, res);
    res.header("Content-Type", "application/json");
    res.send(result);
});

router.get('/lon/:lon/lat/:lat/zoom/:zoom/layer/:layer', function(req, res) {
    const result = getNetworkData(req, res);
    res.header("Content-Type", "application/json");
    res.send(result);
});

router.get('/layers', function(req, res) {
    const result = [1,2,3,4,5];
    res.header("Content-Type", "application/json");
    res.send(result);
});

module.exports = router;
