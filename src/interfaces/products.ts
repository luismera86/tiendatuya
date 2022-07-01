export interface Product {
    id?: number,
    timestamp: number, 
    name: string,
    description: string,
    code: number,
    thumbnail: string,
    price: number,
    stock: number
}

export interface Cart {
    id?: number,
    timestamp: number,
    products: Product
}