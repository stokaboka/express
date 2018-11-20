/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

const MappingAreaServer = require('./MappingAreaServer')

class DataProvider {

    constructor () {

        this.geoPoint = null
        this.zoom = 0

        this.layersData = {}

        this.layers = [
            {id: '1'},
            // {id: '2'},
            // {id: '3'},
            // {id: '4'},
            // {id: '5'}
        ]
        
        this.types = 6

        this.numObjectsPerLayer = 1

        this._area = {lon: 0, lat: 0}

        this._size = {lon: 0, lat: 0}

        this.area = {
            leftTop: {lon: 39.817329, lat: 57.317940},
            rightBottom: {lon: 39.885135, lat: 57.290485}
        }

        this.mappingArea = new MappingAreaServer(6)
        this.grid = null

    }

    initGrid (geoPoint, zoom) {
        this.geoPoint = geoPoint
        this.zoom = zoom
        this.grid = this.mappingArea
        .setZoom(this.zoom)
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
            geo
            // pixels:  this.mappingArea.geoPointToRelativePixelsPoint(geo)
        }
    }

    getRandomPolyline (n) {
        const out = new Array(n)
        for (let i = 0; i < n; i++) {
            out[i] = this.getRandomPoint()
        }
        return out
    }

    getRandomTypeObject (n) {
        let t = Math.round(Math.random() * n, 0)
        return t === 0 ? 1 : t
    }

    generatePointsByType (type) {
        switch (type) {
            case 1 : // point 1
            case 2 : // point 2
            case 3 : // point 3
                return this.getRandomPoint()
                break
            case 4 : // polyline 1
            case 5 : // polyline 2
            case 6 : // polyline 3
                return this.getRandomPolyline(type)
                break
        }
    }


    createObject (id) {

        const type = this.getRandomTypeObject(this.types)
        const out = {
            id: id,
            type,
            points: this.generatePointsByType(type)
        }

        return out
    }
    
    generateObjects (layer) {
        let objects = new Array(0)
        objects[0] = {
            id: 'point-1',
            type: 1,
            points: this.generatePointsByType(1)
        }
        
        objects[1] = {
            id: 'line-2',
            type: 4,
            points: this.generatePointsByType(4)
        }
    
        return objects
    }
    
    generateObjects_ (layer) {

            let objects = new Array(this.numObjectsPerLayer)

            for (let o = 0; o < this.numObjectsPerLayer; o++) {
                let object = this.createObject(`${layer.id}-${o}`)
                objects[o] = object
            }

            return objects

    }

    // generateLayerObjects (layer) {
    //     let objects = this.generateObjects(layer)
    //     return Object.assign(layer, {objects})
    //     // return {
    //     //     id: `${layer}`,
    //     //     title: `Title ${layer}`,
    //     //     description: `Description ${layer}`,
    //     //     objects: objects
    //     // }
    //
    // }

    generateLayersData ()  {

        this.layersData = {}

        for (let l = 0; l < this.layers.length; l++) {
            const layer = this.layers[l]
            this.layersData[layer.id] = this.generateObjects(layer)
        }
        return this
    }

    getLayers () {
        return this.layers
    }

    getLayerData (layerId) {
        if(this.layersData[layerId]) {
            return this.recalcObjects(this.layersData[layerId])
        }else{
            return []
        }
    }


    // ************************

    recalcPoint (point) {
        return Object.assign(
            {},
            point,
            {
                // pixels:      this.mapper.geoPointToRelativePixelsPoint(point.geo)
                pixels: this.mappingArea.geoPointToRelativePixelsPoint(point.geo)
            }
        )
    }

    recalcPolyline (points) {
        return points.map(point => {
            return this.recalcPoint(point)
        })
    }

    recalcObject (object) {
        switch (object.type) {
            case 1 : // point 1
            case 2 : // point 2
            case 3 : // point 3
                object.points = this.recalcPoint(object.points)
                break
            case 4 : // polyline 1
            case 5 : // polyline 2
            case 6 : // polyline 3
                object.points = this.recalcPolyline(object.points)
                break
        }

        return object
    }

    recalcObjects (objects) {
        return objects.map( (object) => {
                return this.recalcObject(object)
            })
    }

    // recalcLayers () {
    //     return this.layers.map(
    //         (layer) => {
    //             layer.objects = this.recalcObjects(layer.objects)
    //             return layer
    //         })
    // }

    getObjectInfo (id) {
        
        const layerId = id.split('-')[0]
        const objectId = id.split('-')[1]
        
        if (this.layersData[layerId]) {
            
            const objects = this.layersData[layerId]
            const object = objects.find((element) => {
                return element.id === objectId
            })
    
            if (object) {
                return object
            }
            
        }
        
        return null
    }
    
}

module.exports = DataProvider
