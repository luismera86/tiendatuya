import { Cart } from '../../interfaces/cart'
import { Product } from '../../interfaces'
import fs from 'fs'

export class Container {
	constructor() {}

	async addCart(cart: Cart[]) {
		try {
			await fs.promises.writeFile('./src/data/carts.json', JSON.stringify(cart))

		} catch (error) {
			console.log(`Lo sentimos hubo un error ${error}`)
		}
	}

	async addProduct(product: Product[]) {
		try {
			await fs.promises.writeFile('./src/data/products.json', JSON.stringify(product))

		} catch (error) {
			console.log(`Lo sentimos hubo un error ${error}`)
		}
	}

	async readProducts() {

		try {
			let data = await fs.promises.readFile('./src/data/products.json', 'utf-8')
			data = JSON.parse(data)
			
			return data

			

		} catch (error) {
			console.log(`Lo sentimos hubo un error ${error}`)
		}

	}

	async readCarts() {
		try {
			let data= await fs.promises.readFile('./src/data/carts.json', 'utf-8')
			data = JSON.parse(data)
			
			
			return data

			

		} catch (error) {
			console.log(`Lo sentimos hubo un error ${error}`)
		}
	}

	
}
