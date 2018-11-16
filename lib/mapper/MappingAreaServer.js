/*
 * Copyright (c) 2018. Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

const Mapping = require('./Mapping')

class MappingAreaServer extends Mapping{
    constructor(pAreaSize){
        super()
        this.areaSizeWidth = pAreaSize
        this.areaSizeHeight = pAreaSize
    
        this.halfAreaSizeWidth = Math.ceil(this.areaSizeWidth / 2)
        this.halfAreaSizeHeight = Math.ceil(this.areaSizeHeight / 2)
    }
    
    // getGrid () {
    //     if(super.zoom && super.geoPoint){
    //         return super.getGrid()
    //     }else{
    //         return null
    //     }
    // }
    
}

module.exports = MappingAreaServer;
