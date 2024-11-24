import Gambar from "../models/gambar.model.js"

export const uploadGambar = async (req, res) => {
    const { base64, fileName } = req.body
    if (!base64) { return res.status(400).json({ msg: "gambar tidak boleh kosong" }) }
    try {
        const gambar = await Gambar.create({
            fileName, base64
        })
        return res.status(200).json(gambar)
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

export const getAllGambars = async (req, res) => {
    try {
        const file = await Gambar.find()
        return res.json({ success: true, data: file })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}