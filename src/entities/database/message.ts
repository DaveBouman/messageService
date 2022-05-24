import { Entity, Column, PrimaryGeneratedColumn, Generated, BeforeInsert, BeforeUpdate } from "typeorm";


@Entity()
export class Message {
    @Column('char')
    name!: string;

    @Column('char')
    content!: string;

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id!: number;

    @Column('char')
    userId!: string;
}
