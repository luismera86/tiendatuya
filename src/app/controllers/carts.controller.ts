import { Cart, Product } from '../../interfaces'
import { Request, Response } from 'express'
import { addProduct, getProducts, products } from './products.controller'

import { Container } from '../models/container'

const saveCartToJson = new Container()

let carts: Cart[] = []

const insertCarts = () => {

	

	saveCartToJson.readCarts().then(resp => {		

			carts = resp
			if ( carts === undefined) {
				let i = Date.now()
				let newId = i * 3
				carts = [{
					id: newId,
					timestamp: Date.now(),
					products: []
				}]
			}

		console.log(carts)
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
		

		console.log(carts)

		resp.status(201).send('Carrito creado con éxito')
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
		const cartProducts = carts.find(c => {
			if (c.id === idCartParams) {
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

		const productAdd: Product = products.find(p => p.id === idProduct)! // Obtenemos el producto
		console.log(productAdd)
	
		const cartIndex = carts.findIndex(cart => cart.id === idCartParams) // Obtenemos el indice del array donde está el carrito

		carts[cartIndex].products.push(productAdd)

		console.log('Este son los carts después de cargar el producto')
		console.log(carts)

		resp.status(201).send('Producto agregado al carrito con éxito')
	} catch (error) {
		console.log(`Lo sentimos hubo un error ${error}`)
	}
}

const deleteProductCart = (req: Request, resp: Response) => {

		const idCartParams = Number(req.params.id) // Parámetro que recibimos del carrito
		const idProduct = Number(req.params.id) // Id del producto obtenido por postman
		const cartIndex = carts.findIndex(cart => cart.id === idCartParams)
		const productIndexCart = carts[cartIndex].products.findIndex( p => p.id === idProduct) // Obtenemos el indice del array de productos del carrito 
		carts[cartIndex].products.slice(productIndexCart, 1)
		



}

export {
	createCart,
	deleteCart,
	getCartProducts,
	addProductIdCart,
	deleteProductCart,
}
