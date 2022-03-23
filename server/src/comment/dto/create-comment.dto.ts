import {IsNotEmpty} from "class-validator";

export class CreateCommentDto {
    @IsNotEmpty()
    readonly text: string

    @IsNotEmpty()
    readonly postId: number
}
