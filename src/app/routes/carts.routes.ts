import { addProductIdCart, createCart, deleteCart, deleteProductCart, getCartProducts } from "../controllers/carts.controller";

import { Router } from "express";

const routeCart = Router()

const path = 'carrito'

routeCart.post(`/${path}`, createCart)

routeCart.delete(`/${path}/:id`, deleteCart)

routeCart.get(`/${path}/productos`, getCartProducts)

routeCart.post(`/${path}/:id/productos`, addProductIdCart)

routeCart.delete(`/${path}/:id/productos/id_prod`, deleteProductCart)

export = routeCart 