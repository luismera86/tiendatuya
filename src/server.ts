import { config, parse } from 'dotenv'

import express from 'express'
import router from './app/routes'
import { test } from './app/models/container';

const dotenv = config()
const app = express()
const PORT = process.env.PORT





app.use(router)
app.use(test, () => { 
	test()
		
 })

 app.get('/', (req, res) => {
	res.send('Holaa')
 })

app.listen(PORT, () => {
	console.log(`Conectado al puerto d: ${PORT}`)
})
