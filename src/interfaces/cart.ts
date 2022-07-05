import { Product } from "./products";

export interface Cart  {
    id: number,
    timestamp: number,
    products: Product[] 
}