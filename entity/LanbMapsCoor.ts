/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import {Entity, Column, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

@Entity()

export class LanbMapsCoor {

    @PrimaryGeneratedColumn()
    id: Number;

    @Column('int')
    billingid: Number;

    @Column('int')
    device_id: Number;


}


//  `billing_id`, `device_id`, `coor`, `state`
