import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import {UserEntity} from "../../user/entities/user.entity";
import {PostEntity} from "../../post/entities/post.entity";

@Entity('comments')
export class CommentEntity {
    @PrimaryGeneratedColumn()
    readonly id: number

    @Column()
    readonly text: string

    @ManyToOne(() => UserEntity, {nullable: false})
    @JoinColumn({name: 'userId'})
    readonly user: UserEntity

    @ManyToOne(() => PostEntity, {nullable: false})
    @JoinColumn({name: 'postId'})
    readonly post: PostEntity

    @CreateDateColumn({type: "timestamp"})
    readonly createdAt: Date

    @UpdateDateColumn({type: "timestamp"})
    readonly updatedAt: Date
}