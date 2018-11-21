/*
 * Copyright (c) 2018. Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

var path = require('path')

const TilesLoader = require('./TilesLoader')
// const { GeoPoint, DecartPoint, PixelPoint } = require('./Mercator');
const MappingAreaServer = require('./MappingAreaServer')

class Mapper {
  constructor (geoPoint, zoom, imagesPath) {
    const mappingArea = new MappingAreaServer(6)

    this.config = {
      logging: {
        level: 2
      },
      images: {
        path: path.join(__dirname, imagesPath),
        reload: true
      },
      /**
             * TODO move zoom into "grid"
             */
      map: {
        z: 12
      },
      grid: mappingArea
        .setZoom(zoom)
        .setGeoPoint(geoPoint)
        .getGrid()
    }
  }

  start (forceReload) {
    this.config.images.reload = forceReload
    const tilesLoader = new TilesLoader(this.config)
    tilesLoader.start()
  }
}

module.exports = Mapper
