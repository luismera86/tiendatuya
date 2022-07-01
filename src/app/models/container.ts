import { Cart } from '../../interfaces/products';
import fs from 'fs'

export class Container {

    constructor() {
        
    }

    async addCart(cart: Cart) {
        let data = await fs.promises.readFile('./src/data/cart.json', 'utf-8')
        if (!data) {
			cart.id = 1
			const arr = [cart]
			await fs.promises.writeFile('./src/data/cart.json', JSON.stringify(arr))
			return cart.id
		} else {
			cart.id = data.length + 1
            let newData = [...data, cart]
			await fs.promises.writeFile('./src/data/cart.json', JSON.stringify(newData))
			return cart.id
		}
    }
    
}

const producto: Cart = {
	
	timestamp: Date.now(),
	products: {
		id: 1,
    	timestamp: Date.now(), 
    	name: 'Lápiz',
    	description: 'Es un la',
    	code: 15456,
    	thumbnail: 'url',
    	price: 45,
    	stock: 50
	}
}

const producto2: Cart = {
	
	timestamp: Date.now(),
	products: {
		id: 2,
    	timestamp: Date.now(), 
    	name: 'Lápiz',
    	description: 'Es un la',
    	code: 15456,
    	thumbnail: 'url',
    	price: 45,
    	stock: 50
	}
}
const prueba = new Container()

export const test = async() => {
	await prueba.addCart(producto)
	await prueba.addCart(producto2)
}

