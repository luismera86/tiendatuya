import { addProductIdCart, createCart, deleteCart, deleteProductCart, getCartProducts } from "../controllers/cart";

import { Router } from "express";

const routeCart = Router()

const path = 'carrito'

routeCart.post(`/${path}`, createCart)

routeCart.delete(`/${path}/:id`, deleteCart)

routeCart.get(`/${path}/:id/productos`, getCartProducts)

routeCart.post(`/${path}/:id/productos`, addProductIdCart)

routeCart.delete(`/${path}/:id/productos/id_prod`, deleteProductCart)

export = routeCart 