import express from "express";
const app = express();
import cors from "cors";

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    Credential:true
}))

app.use(express.json({limit:'50kb'}))
app.use(express.urlencoded({extended:true,limit:'50kb'}))

app.get('/',(req, res) => {
    res.json({msg:"hello backend is working"})
})

// importing routes

import router from './src/routes/route.js'

app.use("/api/v1/data",router)

export default app