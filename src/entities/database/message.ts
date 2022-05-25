import { Entity, Column, PrimaryGeneratedColumn, Generated, BeforeInsert, BeforeUpdate, JoinColumn, JoinTable, CreateDateColumn } from "typeorm";


@Entity()
export class Message {
    @Column()
    name!: string;

    @Column()
    content!: string;

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    userId!: string;

    @Column("simple-array", { nullable: true })
    userHeartId!: string[];

    @CreateDateColumn()
    created!: Date;
}
