import {IsEmail, Length} from "class-validator";

export class CreateUserDto {
    @Length(3)
    readonly fullName: string

    @IsEmail(undefined, {message: 'Неверная почта'})
    readonly email: string

    @Length(6, 32, {message: 'Пароль должен быть минимум 6 символов'})
    readonly password?: string
}
