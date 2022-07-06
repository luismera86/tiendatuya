import { Router } from "express";
import express from 'express';
import routeCart from "./carts.routes";
import routeProducts from "./products.routes";

const router = Router()



router.use(routeProducts)
router.use(routeCart)

export = router