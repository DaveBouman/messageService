import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, ManyToOne, Generated } from 'typeorm';
import { BaseEntity as Base } from 'typeorm';

export interface BaseEntity {
    id: number;
    uuid: string;
    createdOn: Date;
    updatedOn: Date;
    version: number;
}

export abstract class BaseEntity extends Base {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    @Generated("uuid")
    uuid!: string;

    @Column({ nullable: true })
    userId!: string;

    @Column({
        nullable: true,
        default: new Date()
    })
    createdOn!: Date;

    @Column({
        nullable: true,
        default: new Date()
    })
    updatedOn!: Date;

    @Column({ default: 1 })
    version!: number;

    @BeforeInsert()
    insertDate() {
        this.updatedOn = new Date();
        this.createdOn = new Date();
    }

    @BeforeUpdate()
    updateDate() {
        this.updatedOn = new Date();
        this.version++;
    }
}