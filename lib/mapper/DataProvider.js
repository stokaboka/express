/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

const MappingAreaServer = require('./MappingAreaServer')

class DataProvider {

    constructor (geoPoint, zoom) {

        this.geoPoint = geoPoint
        this.zoom = zoom

        this.layers = []

        this.numLayers = 5
        this.numObjectsPerLayer = 50000

        this._area = {lon: 0, lat: 0}

        this._size = {lon: 0, lat: 0}

        this.area = {
            leftTop: {lon: 39.817329, lat: 57.317940},
            rightBottom: {lon: 39.885135, lat: 57.290485}
        }

        this.mappingArea = new MappingAreaServer(6)
        this.grid = this.mappingArea
            .setZoom(zoom)
            .setGeoPoint(this.geoPoint)
            .getGrid()
    }

    get area () {
        return this._area
    }

    set area (value) {
        this._area = value
        this._size = {
            lon: this._area.rightBottom.lon - this._area.leftTop.lon,
            lat: this._area.rightBottom.lat - this._area.leftTop.lat
        }
    }

    get size () {
        return this._size
    }


    getRandomPoint () {

        // geo = {
        //   lon: 39.849086,
        //   lat: 57.303309
        // }
        // geo = {
        //   lon: 39.877582,
        //   lat: 57.308744
        // }

        const geo =
            {
                lon: this.area.leftTop.lon + Math.random() * this.size.lon,
                lat: this.area.leftTop.lat + Math.random() * this.size.lat
            }

        return {
            geo,
            pixels:  this.mappingArea.geoPointToRelativePixelsPoint(geo)
        }
    }

    getRandomPolyline (n, vm, area) {
        const out = new Array(n)
        for (let i = 0; i < n; i++) {
            out[i] = getRandomPoint(vm, area)
        }
        return out
    }

    getRandomTypeObject (n) {
        return Math.round(Math.random() * n, 0)
    }

    generatePointsByType (type) {
        switch (type) {
            case 0 : // point 1
            case 1 : // point 2
                // return this.getRandomPoint()
            case 2 : // polyline 1
            case 3 : // polyline 2
            case 4 : // polyline 1
                return this.getRandomPoint()
                // return this.getRandomPolyline(type)
        }
    }


    createObject (id) {

        const type = this.getRandomTypeObject(4)
        const out = {
            id: id,
            type,
            points: this.generatePointsByType(type)
        }

        return out
    }


    generateObjects (l) {

            let objects = new Array(this.numObjectsPerLayer)

            for (let o = 0; o < this.numObjectsPerLayer; o++) {
                let object = this.createObject(`${l}-${o}`)
                objects[o] = object
            }

            return objects

    }

    generateLayer (layer) {
        let objects = this.generateObjects(layer)
        return {
            id: `${layer}`,
            title: `Title ${layer}`,
            description: `Description ${layer}`,
            objects: objects
        }

    }

    generateLayers ()  {

        this.layers = new Array(this.numLayers)

        for (let l = 0; l < this.numLayers; l++) {
            this.layers[l] = this.generateLayer(l)
        }
        //
        // console.log('generateObjects')
        // console.log(layers)
        // console.log('--------------------------')
        return this
    }

    getLayers () {
        return this.layers
    }

}

module.exports = DataProvider
