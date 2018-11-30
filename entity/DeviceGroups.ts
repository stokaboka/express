/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import {Entity, Column, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class DeviceGroups {

    @PrimaryGeneratedColumn()
    id: Number;

    @Column('int')
    billingid: Number;

    @Column('int')
    group_id: Number;

    @Column({
        type: "varchar",
        length: 255
    })
    name: string;

    @Column({
        type: "varchar",
        length: 255
    })
    desc: string;

    @Column({
        type: "varchar",
        length: 255
    })
    coors: string;
}

