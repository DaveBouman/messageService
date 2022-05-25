import { Entity, Column, PrimaryGeneratedColumn, Generated, BeforeInsert, BeforeUpdate } from "typeorm";


@Entity()
export class Message {
    @Column()
    name!: string;

    @Column()
    content!: string;

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    userId!: string;
}
