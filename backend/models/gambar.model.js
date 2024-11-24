import mongoose from "mongoose";

const gambarSchema = new mongoose.Schema({
    fileName: String,
    base64: String
})

const Gambar = mongoose.model("gambar", gambarSchema)
export default Gambar
