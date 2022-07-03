import { Request, Response } from 'express'

import { Cart } from '../../interfaces/cart'
import { Container } from '../models/container'

let carts: Cart[] = []

const createCart = (req: Request, resp: Response) => {
	try {
		if (carts.length === 0) {
			const newCart = {
				id: 1,
				timestamp: Date.now(),
			}
			carts.push(newCart)

			const saveCartToJson = new Container()
			saveCartToJson.addCart(carts)

			resp.status(201).send('Carrito creado con éxito')

		} else {
			const idSuma = carts[carts.length -1].id
			const newId = idSuma + 1
			const newCart = {
				id: newId,
				timestamp: Date.now(),
			}
			carts.push(newCart)
			const saveCartToJson = new Container()
			saveCartToJson.addCart(carts)

			resp.status(201).send('Carrito creado con éxito')
			
		}
	} catch (error) {
		console.log(`Lo sentimos hubo un error ${error}`)
	}
}

const deleteCart = (req: Request, resp: Response) => {
	try {

		const idCart = Number(req.params.id)
		const checkCart = carts.some( cart => cart.id === idCart)

		

		if(checkCart) {
			 const newCart = carts.filter( cart => cart.id !== idCart)
			 carts = newCart
			const saveCartToJson = new Container()
			saveCartToJson.addCart(newCart)

			resp.status(200).send('Carrito eliminado con éxito')
			
		} else {
			resp.status(503).send('No se pudo encontrar el carrito')
		}

		
		
	} catch (error) {
		console.log(`Lo sentimos hubo un error ${error}`)
	}
}

const getCartProducts = (req: Request, resp: Response) => {}

const addProductIdCart = (req: Request, resp: Response) => {}

const deleteProductCart = (req: Request, resp: Response) => {}

export {
	createCart,
	deleteCart,
	getCartProducts,
	addProductIdCart,
	deleteProductCart,
}
