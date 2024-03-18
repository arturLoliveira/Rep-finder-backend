import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Republica from './Republica';

@Entity('images')
export default class Image {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    path: string;

    @ManyToOne(() => Republica, republica => republica.images)
    @JoinColumn({ name: 'republica_id' })    
    republica: Republica;
}