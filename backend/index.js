import cors from "cors";
import express from "express";
import "dotenv/config"
import { connectDB } from "./utils/connectDB.js"
import gambarRoutes from "./routes/gambar-router.js"

const app = express();

//midlwares
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '1mb' }));
app.use(cors())


//database
connectDB()

//routes
app.use("/api/gambar", gambarRoutes)

//config
const port = process.env.PORT || 5000

//sambungkan dengan fe (hanya untuk development)

app.listen(port, () => {
    console.log("server berjalan di PORT : " + port)
})
