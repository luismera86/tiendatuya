import { config } from 'dotenv'
import express from 'express'
import router from './app/routes/index.routes'

const dotenv = config()
const app = express()
const PORT = process.env.PORT





app.use('/api', router)
/* app.use(test, () => { 
	test()
		
 }) */

 app.get('/', (req, res) => {
	res.json({
		msg: 'Hola'
	})
 })

app.listen(PORT, () => {
	console.log(`Conectado al puerto : ${PORT}`)
})
