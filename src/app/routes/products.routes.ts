import { addProduct, deleteProduct, getProductId, getProducts, modifyProduct } from "../controllers/products.controller";

import { Router } from "express";

const routeProducts = Router()

const path = 'productos'

routeProducts.get(`/${path}`, getProducts)

routeProducts.get(`/${path}/:id?`, getProductId)

routeProducts.post(`/${path}`, addProduct)

routeProducts.put(`/${path}/:id`, modifyProduct)

routeProducts.delete(`/${path}/:id`, deleteProduct)

export = routeProducts 