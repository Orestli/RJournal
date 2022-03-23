export class SearchPostDto {
    readonly title?: string
    readonly body?: string
    readonly views?: 'DESC' | 'ASC'
    readonly limit?: number
    readonly take?: number
    readonly tag?: string
}
