import { Cart, Product } from '../../interfaces'
import { Request, Response } from 'express'

import { Container } from '../models/container'
import { products } from './products.controller'

const saveCartToJson = new Container()

let carts: Cart[] = []

const insertCarts = () => {
	saveCartToJson.readCarts().then(resp => {
		carts = resp
		if (carts === undefined) {
			let i = Date.now()
			let newId = i * 3
			carts = [
				{
					id: newId,
					timestamp: Date.now(),
					products: [],
				},
			]
		}

		
	})
}

insertCarts()

const createCart = (req: Request, resp: Response) => {
	try {
		let i = Date.now()
		let newId = i * 3
		const newCart: Cart = {
			id: newId,
			timestamp: Date.now(),
			products: [],
		}

		carts.push(newCart)

		saveCartToJson.addCart(carts)

		

		resp.status(201).send(`Carrito creado con éxito con el id:${newCart.id}`)
	} catch (error) {
		console.log(`Lo sentimos hubo un error ${error}`)
	}
}

const deleteCart = (req: Request, resp: Response) => {
	try {
		const idCart = Number(req.params.id)
		const checkCart = carts.some(cart => cart.id === idCart)

		if (checkCart) {
			const newCarts = carts.filter(cart => cart.id !== idCart)
			carts = newCarts
			saveCartToJson.addCart(newCarts)
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
		const checkCart = carts.some(c => c.id === idCartParams)

		if ( checkCart ) {
		
		const cartProducts = carts.filter(c => c.id === idCartParams)
		resp.status(200).send(cartProducts[0].products)

		} else {
			
			resp.status(400).send(`Lo siento no pudimos encontrar el carrito con el id: ${idCartParams}`)
		}		
		

	} catch (error) {
		console.log(`Lo sentimos hubo un error ${error}`)
	}
}

const addProductIdCart = (req: Request, resp: Response) => {
	try {
		const idCartParams = Number(req.params.id) 
		const idProduct = Number(req.body.id) 
		const productIndex = products.findIndex(p => p.id === idProduct)
		const productAdd: Product = products.find(p => p.id === idProduct)! 
		const cartIndex = carts.findIndex(cart => cart.id === idCartParams) 

		if (products[productIndex]) {
			carts[cartIndex].products.push(productAdd)

			saveCartToJson.addCart(carts)
			resp.status(201).send('Producto agregado al carrito con éxito')
		} else {
			resp.status(400).send('No se pudo encontrar el producto')
		}
	} catch (error) {
		console.log(`Lo sentimos hubo un error ${error}`)
	}
}

const deleteProductCart = (req: Request, resp: Response) => {
	try {
		const idCartParams = Number(req.params.id) // Parámetro que recibimos del carrito
		const idProduct = Number(req.params.id_prod) // Id del producto obtenido por postman
		const cartIndex = carts.findIndex(cart => cart.id === idCartParams)
		const productIndexCart = carts[cartIndex].products.findIndex(
			p => p.id === idProduct
		)

		const checkCart = carts.some(c => c.id === idCartParams)
		const checkProduct = products.some(p => p.id === idProduct)

		if (checkCart && checkProduct) {
			if (carts[cartIndex].products[productIndexCart].id === idProduct) {
				carts[cartIndex].products.splice(productIndexCart, 1)

				saveCartToJson.addCart(carts)

				resp.status(200).send('Producto del carrito eliminado con éxito')
			}
		} else {
			resp.status(404).send('Lo sentimos no pudimos encontrar el producto')
		}
	} catch (error) {

		console.log(`Lo sentimos hubo un error ${error}`)
	}
}

export {
	createCart,
	deleteCart,
	getCartProducts,
	addProductIdCart,
	deleteProductCart,
}
