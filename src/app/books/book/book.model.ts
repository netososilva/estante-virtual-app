export interface Book {
    id: number
    name: string
    author: {
        name: string
    }
    imagePath: string
    description: string
}