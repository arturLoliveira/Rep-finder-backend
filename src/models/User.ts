import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';

import { v4 as uuid } from "uuid";

@Entity('users')
export default class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }

    // @OneToMany(() => Republica, rep => rep.users, {
    //     cascade: ['insert', 'update']
    // })
    // @JoinColumn({ name: 'republica_id' })    
    // republica: Republica;

}