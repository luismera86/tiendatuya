import { addProduct, deleteProduct, getProductId, getProducts, modifyProduct } from "../controllers/products.controller";

import { Router } from "express";
import { checkAdmin } from "../middleware/admin";

const routeProducts = Router()

const path = 'productos'

routeProducts.get(`/${path}`, getProducts)

routeProducts.get(`/${path}/:id?`, getProductId)

routeProducts.post(`/${path}`, checkAdmin, addProduct) 

routeProducts.put(`/${path}/:id`, checkAdmin, modifyProduct)

routeProducts.delete(`/${path}/:id`, checkAdmin, deleteProduct)

export = routeProducts 