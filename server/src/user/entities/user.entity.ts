import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany} from 'typeorm';
import {CommentEntity} from "../../comment/entities/comment.entity";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    readonly id: number

    @Column()
    readonly fullName: string

    @Column({
        unique: true
    })
    readonly email: string

    @OneToMany(() => CommentEntity, (comment) => comment.user, {
        eager: false,
        nullable: true
    })
    comments: CommentEntity[]

    @Column({nullable: true})
    readonly password?: string

    @CreateDateColumn({type: "timestamp"})
    readonly createdAt: Date

    @UpdateDateColumn({type: "timestamp"})
    readonly updatedAt: Date
}