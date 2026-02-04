const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose");
const Note = require("./Notes");


const app = express();

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://akhilchandps_db_user:fya1EjgWmIQF9pQa@cluster0.zhvzc5t.mongodb.net/noteDB?appName=Cluster0").then(() => {
    console.log("MongoDB connected succcessfully");

}).catch((err) => {
    console.log("MongoDB connection  error", err);

})

app.post("/notes",async(req, res) => {
    try {
        const { text } = req.body

        const notes = new Note({
            text
        })

        notes.save();
        res.status(201).json({ message: "note created successfull", notes })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.get("/notes", async (req, res) => {
    try {

        const notes = await Note.find();
        if (!notes) {
            return res.status(404).json("Notes not available")
        }

        res.status(200).json(notes)

    } catch (error) {
        res.status(500).json({ message: error.message })

    }
})


PORT = 5000

app.listen(PORT, () => {
    console.log("Server running on", PORT);

})
