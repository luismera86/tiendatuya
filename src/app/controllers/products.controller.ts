import { Request, Response } from 'express'

import { Container } from '../models/container'
import { Product } from '../../interfaces'

export let products: Product[] = []

const productsToJson = new Container()

const insertProducts = () => {
	productsToJson.readProducts().then(resp => {
		products = resp
	})
}

insertProducts()

const getProducts = (req: Request, resp: Response) => {
	try {
		resp.status(200).json(products)
	} catch (error) {
		console.log(`Lo sentimos hubo un error ${error}`)
	}
}

const getProductId = (req: Request, resp: Response) => {
	try {
		const idProduct = Number(req.params.id)
		const checkProduct = products.some(p => p.id === idProduct)
		

		if (checkProduct) {
			const productView = products.find(p => p.id === idProduct)

			resp.status(200).json(productView)
		} else {
			resp.status(400).send('No se pudo encontrar el producto')
		}
	} catch (error) {
		console.log(`Lo sentimos hubo un error ${error}`)
	}
}

const addProduct = (req: Request, resp: Response) => {
	try {
		let i = Date.now()
		let newId = i * 3
		let newCode = (i * 5) / 2

		const { name, description, thumbnail, price, stock } = req.body

		if (
			name &&
			description &&
			isNaN(thumbnail) &&
			Number(price) &&
			Number(stock)
		) {
			if (products === undefined) {
				products = [
					{
						id: newId,
						timestamp: Date.now(),
						name: name,
						description: description,
						code: newCode,
						thumbnail: thumbnail,
						price: price,
						stock: stock,
					},
				]

				productsToJson.addProduct(products)
			} else {
				const newProduct: Product = {
					id: newId,
					timestamp: Date.now(),
					name: name,
					description: description,
					code: newCode,
					thumbnail: thumbnail,
					price: price,
					stock: stock,
				}

				products.push(newProduct)
			}

			productsToJson.addProduct(products)

			resp.status(201).send('Producto agregado con éxito')
		} else {
			resp.status(400).json({
				msg: 'No se pudo cargar el producto, debe tener las siguientes propiedades',
				name: 'Nombre del Producto',
				description: 'Descripción del producto',
				thumbnail: 'Dirección url de la imagen del producto',
				price: 'El precio el producto en valor numérico',
				stock: 'La cantidad de sock en valor numérico',
			})
		}
	} catch (error) {
		console.log(`Lo sentimos hubo un error ${error}`)
	}
}

const modifyProduct = (req: Request, resp: Response) => {
	try {
		const idProduct = Number(req.params.id)
		const productIndex = products.findIndex(p => p.id === idProduct)
		const checkProduct = products.some(p => p.id === idProduct)

		const { name, description, code, thumbnail, price, stock } = req.body

		if (
			name &&
			description &&
			isNaN(thumbnail) &&
			Number(price) &&
			Number(stock) &&
			checkProduct
		) {
			// Esta es la única forma que se me ocurrió para validar los datos que lleguen de postman que se introduzcan con el tipa que corresponde cada propiedad, el productIndex === -1 es por que si pones mal el id en el parámetro el findIndex() devuelve el valor -1 y te genera un nuevo objeto que no entra en el array de products

			const productModify: Product = {
				id: idProduct,
				timestamp: Date.now(),
				name: name,
				description: description,
				code: code,
				thumbnail: thumbnail,
				price: price,
				stock: stock,
			}

			products[productIndex] = productModify

			productsToJson.addProduct(products)

			resp.status(200).send('Producto modificado con éxito')
		} else {
			if (!checkProduct) {
				resp
					.status(400)
					.send(`No se encuentra el producto con el id: ${idProduct}`)
			} else {
				resp.status(400).json({
					msg: 'No se pudo modificar el producto, debe tener las siguientes propiedades',
					name: 'Nombre del Producto',
					description: 'Descripción del producto',
					thumbnail: 'Dirección url de la imagen del producto',
					price: 'El precio el producto en valor numérico',
					stock: 'La cantidad de sock en valor numérico',
				})
			}
		}
	} catch (error) {
		console.log(`Lo sentimos hubo un error ${error}`)
	}
}

const deleteProduct = (req: Request, resp: Response) => {
	try {
		const idProduct = Number(req.params.id)
		const newProducts = products.filter(p => p.id !== idProduct)
		const checkProduct = products.some(p => p.id === idProduct)

		if (checkProduct) {
			products = newProducts

			productsToJson.addProduct(products)

			resp.status(200).send(`Producto con el id: ${idProduct} fue eliminado`)
		} else {
			resp.status(400).send('No se encuentra el producto')
		}
	} catch (error) {
		console.log(`Lo sentimos hubo un error ${error}`)
	}
}

export { getProductId, addProduct, modifyProduct, deleteProduct, getProducts }
