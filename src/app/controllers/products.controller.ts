import { Request, Response } from "express"

import { Container } from "../models/container"
import { Product } from "../../interfaces"

const productsToJson = new Container

const insertProducts = () => { 

   productsToJson.readProducts()
   .then( resp => {

      if ( resp ) {
         products.push(resp)
      }
      
   })

   console.log(' aqui abajos los productos')
   console.log(products)

 }

 insertProducts()




export let products: Product[] = []



const getProducts = (req: Request, resp: Response) => { 

   
  
   
}

const getProduct = (req: Request, resp: Response) => { 

      
 }


const addProduct = (req: Request, resp: Response) => { 
         
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

    
      products.push(newProduct)

     

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