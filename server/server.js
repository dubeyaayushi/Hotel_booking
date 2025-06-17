/* creating our basic server */

import express from "express"
import "dotenv/config"/* using this we can use our environmental variables */

import cors  from "cors";/* cors will allow to connect any Backend with the frontend */

const app = express ()
app.use(cors()) //Enable Cors-origin Resource  Sharing


app.get('/', (req,res) => res.send("API is Working fine"))


const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> console.log(`server running on port ${PORT}`))

