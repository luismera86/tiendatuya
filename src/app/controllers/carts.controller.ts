import { Cart, Product } from '../../interfaces'
import { Request, Response } from 'express'
import { addProduct, products } from './products.controller'

import { Container } from '../models/container'

const saveCartToJson = new Container()



let carts: Cart[] = []

const createCart = (req: Request, resp: Response) => {
	try {
		if (carts.length === 0) {
			const newCart: Cart = {
				id: 1,
				timestamp: Date.now(),
				products: []
			}
			carts.push(newCart)

			saveCartToJson.addCart(carts)

			resp.status(201).send('Carrito creado con éxito')
		} else {
			const idSuma = carts[carts.length - 1].id
			const newId = idSuma + 1
			const newCart = {
				id: newId,
				timestamp: Date.now(),
				products: []
			}
			carts.push(newCart)

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
		const checkCart = carts.some(cart => cart.id === idCart)

		if (checkCart) {
			const newCart = carts.filter(cart => cart.id !== idCart)
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

const getCartProducts = (req: Request, resp: Response) => {
	try {
		
		const idCartParams = Number(req.params.id)
		const cartProducts = carts.find( c => {
			if ( c.id === idCartParams ) {

				return c.products
			}
		})

		resp.status(200).send(cartProducts)


	} catch (error) {

		console.log(`Lo sentimos hubo un error ${error}`)
		
	}


}

const addProductIdCart = async (req: Request, resp: Response) => {
	

	try {
		const idCartParams = Number(req.params.id) // Parámetro que recibimos del carrito
		const idProduct = Number(req.body.id) // Id del producto obtenido por postman
		const productAdd: any = products.find(p => p.id === idProduct)// Obtenemos el producto
		
		const cartIndex = carts.findIndex(cart => cart.id === idCartParams) // Obtenemos el indice del array donde está el carrito

		const insertProductInCart = carts.forEach(c => {
			if (c.id === idCartParams) {

			/* 	carts[cartIndex].products.forEach( p => {
					if ( productAdd ) {
						p = productAdd
					} else if ( c.products.length && productAdd ) {
						let pr = carts[cartIndex].products.map( p => p)
						p = [...pr]
					}
				}) */

				if ( c.products && productAdd) {
					let products = carts[cartIndex].products
					carts[cartIndex].products = [...[products], productAdd]
				} else if( productAdd ){
					carts[cartIndex].products = productAdd
				} 

			

			/* carts[cartIndex] = {
					id: idCartParams,
					timestamp: c.timestamp,
					products: productAdd
				}  */
			}

			console.log( carts )
		})

		resp.status(201).send('Producto agregado al carrito con éxito')

	
	} catch (error) {
		console.log(`Lo sentimos hubo un error ${error}`)
	}
	
}

const deleteProductCart = (req: Request, resp: Response) => {}

export {
	createCart,
	deleteCart,
	getCartProducts,
	addProductIdCart,
	deleteProductCart,
}
