interface Indexable {
  [key: string]: any;
}

export interface IProduct extends Indexable {
    id?: number
    title: string
    price: number
    description: string
    category: string
}