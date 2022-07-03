import { addProduct, deleteProduct, getProduct, modifyProduct } from "../controllers/products";

import { Router } from "express";

const routeProducts = Router()

const path = 'productos'

routeProducts.get(`/${path}/:id?`, getProduct)

routeProducts.post(`${path}`, addProduct)

routeProducts.put(`/${path}/:id`, modifyProduct)

routeProducts.delete(`/${path}/:id`, deleteProduct)

export = routeProducts 