import { config } from 'dotenv'
import express from 'express'
import router from './app/routes/index.routes'

const dotenv = config()
const app = express()
const PORT = process.env.PORT




app.use(express.json())

app.use(express.urlencoded({ extended: true }))
app.use('/api', router)



app.listen(PORT, () => {
	console.log(`Conectado al puerto : ${PORT}`)
})
