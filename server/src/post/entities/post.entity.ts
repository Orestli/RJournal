import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne} from 'typeorm';
import {OutputBlockData} from "../dto/create-post.dto";
import {UserEntity} from "../../user/entities/user.entity";

@Entity('posts')
export class PostEntity {
    @PrimaryGeneratedColumn()
    readonly id: number

    @Column()
    readonly title: string

    @Column({type: 'jsonb'})
    readonly body: OutputBlockData[]

    @Column()
    readonly description: string

    @ManyToOne(() => UserEntity, {
        eager: true
    })
    readonly user: UserEntity

    @Column({
        default: 0,
    })
    readonly views: number

    @Column({nullable: true})
    readonly tags?: string

    @CreateDateColumn({type: "timestamp"})
    readonly createdAt: Date

    @UpdateDateColumn({type: "timestamp"})
    readonly updatedAt: Date
}