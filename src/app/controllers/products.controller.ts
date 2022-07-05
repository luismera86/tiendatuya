import { Request, Response } from "express"

import { Container } from "../models/container"
import { Product } from "../../interfaces"

export let products: Product[] = []

console.log(products)
const productsToJson = new Container

const insertProducts = () => { 

   productsToJson.readProducts()
   .then( resp => {
         products = resp

   })

  

 }

 insertProducts()

 console.log(products)








const getProducts = (req: Request, resp: Response) => { 

      resp.status(200).json(products)

   
  
   
}

const getProductId = (req: Request, resp: Response) => { 
      const idProduct = Number(req.params.id)
      const productView = products.find( p => p.id === idProduct)
      resp.status(200).json(productView)

      
 }


const addProduct = (req: Request, resp: Response) => { 
         
   try {
      let i = Date.now()
      let newId = i * 3
      const {id, name, description, code, thumbnail, price, stock} = req.body

      if ( products === undefined ) {
         products = [
            {
               id: newId,
               timestamp: Date.now(),
               name: 'Auto',
               description: 'Es un auto',
               code: 1155,
               thumbnail: 'url',
               price: 3242,
               stock: 2
            }
         ]

         

      } else {
         const newProduct: Product = {
            id: newId,
            timestamp: Date.now(),
            name: 'moto',
            description: 'Es un auto',
            code: 1155,
            thumbnail: 'url',
            price: 3242,
            stock: 2
         }

         products.push(newProduct)
      }
     

      productsToJson.addProduct(products)

      console.log('Producto agregado')
      console.log(products)

      resp.status(201).send('Producto agregado con éxito')
      
   } catch (error) {

      console.log(`Lo sentimos hubo un error ${error}`)
      
   }

 }


const modifyProduct = (req: Request, resp: Response) => { 

   const idProduct = Number(req.params.id)
   const productIndex = products.findIndex( p => p.id === idProduct)
   const { name, description, code, thumbnail, price, stock} = req.body
   const productModify: Product = {
      id: idProduct,
      timestamp: Date.now(),
      name: name,
      description: description,
      code: code,
      thumbnail: thumbnail,
      price: price,
      stock: stock

   }

   products[productIndex] = productModify

      
 }

const deleteProduct = (req: Request, resp: Response) => { 

   const idProduct = Number(req.params.id)
   const newProducts = products.filter( p => p.id !== idProduct)
   products = newProducts

   


      

 }

 export {
    getProductId,
    addProduct,
    modifyProduct,
    deleteProduct,
    getProducts
 }