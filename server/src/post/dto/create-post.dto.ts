import {IsArray, IsOptional, IsString} from "class-validator";

export interface OutputBlockData {
    id?: string
    type: 'paragraph' | string
    data: any
}

export class CreatePostDto {
    @IsString()
    readonly title: string

    @IsArray()
    readonly body: OutputBlockData[]

    @IsOptional()
    @IsArray()
    readonly tags: string
}
