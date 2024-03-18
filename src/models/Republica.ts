import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import Image from './Image';
import User from './User';


@Entity('republicas')
export default class Republica {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;
    

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    about: string;

    @Column()
    address: string;

    @Column()
    whatsapp: number;

    @Column()
    open_on_weekends: boolean;

    @OneToMany(() => Image, image => image.republica, {
        cascade: ['insert', 'update']
    })

    @JoinColumn({ name: 'republica_id' })
    images: Image[]; 

    // @JoinColumn({ name: 'republica_id' })
    // users: User; 

}