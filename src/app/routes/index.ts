import { Router } from "express";
import express from 'express';
import routeCart from "./cart";
import routeProducts  from "./products";

const router = Router()



router.use(routeProducts)
router.use(routeCart)

export = router