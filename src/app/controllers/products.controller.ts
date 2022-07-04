import { Request, Response } from "express"

import { Container } from "../models/container"
import { Product } from "../../interfaces"

const productsToJson = new Container

export const products: Product[] = []

const getProducts = (req: Request, resp: Response) => { 

   productsToJson.readProducts()
      .then(products => {
         resp.json(products)
      })

  
   
}

const getProduct = (req: Request, resp: Response) => { 

      resp.json(products)
   
 }


const addProduct = (req: Request, resp: Response) => { 
         console.log('Entrando en productos')
   try {
      let i = Date.now()
      let newId = i * 3
      const {id, name, description, code, thumbnail, price, stock} = req.body

      const newProduct: Product = {
         id: newId,
         timestamp: Date.now(),
         name: 'Auto',
         description: 'Es un auto',
         code: 1155,
         thumbnail: 'url',
         price: 3242,
         stock: 2
      }

    /*   const newProduct: Product = {
         id: id,
         timestamp: Date.now(),
         name: name,
         description: description,
         code: code,
         thumbnail: thumbnail,
         price: price,
         stock: stock
      }
 */
      products.push(newProduct)

      console.log(newProduct)
      /* products.push({id, timestamp, name, description, code, thumbnail, price, stock}) */

      productsToJson.addProduct(products)

      resp.status(201).send('Producto agregado con éxito')
      
   } catch (error) {

      console.log(`Lo sentimos hubo un error ${error}`)
      
   }

 }


const modifyProduct = (req: Request, resp: Response) => { 

 }

const deleteProduct = (req: Request, resp: Response) => { 


 }

 export {
    getProduct,
    addProduct,
    modifyProduct,
    deleteProduct,
    getProducts
 }