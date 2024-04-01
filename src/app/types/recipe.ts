export interface Recipe {
    _id: string | undefined
    name: string
    image: string
    ingredients: string[]
    description: string
    preperationTime: number
    favorite: string[] | undefined
    owner: string | undefined
    createdAt: string | undefined
}