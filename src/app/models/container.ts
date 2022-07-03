import { Cart } from '../../interfaces/cart'
import fs from 'fs'

export class Container {
	constructor() {}

	async addCart(cart: Cart[]) {
		try {
			await fs.promises.writeFile('./src/data/cart.json', JSON.stringify(cart))
		} catch (error) {
			console.log(`Lo sentimos hubo un error ${error}`)
		}
	}
}
