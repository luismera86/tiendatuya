import express from "express";

const app = express();



const PORT = 8080;



app.use(`${__dirname}/src/app/routes` )


app.listen(PORT, () => {
 console.log(`conectado al puerto: ${PORT}`);
});
