/*
 * Copyright (c) 2018. Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

const Mapping = require('./Mapping')

class MappingAreaServer extends Mapping{
    constructor(pAreaSize){
        super()
        super.areaSizeWidth = pAreaSize
        super.areaSizeHeight = pAreaSize

        super.halfAreaSizeWidth = Math.ceil(super.areaSizeWidth / 2)
        super.halfAreaSizeHeight = Math.ceil(super.areaSizeHeight / 2)
    }

}

module.exports = MappingAreaServer;
