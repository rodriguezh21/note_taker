const express = require("express");
const path = require("path");
const notes = require("../db/db.json")
const fs = require("fs")


// APP and PORT

const app = express();
const PORT = 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});
app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./db/db.json"));
    res.json(notes);
}); 

app.post("/api/notes", function(req, res){
    let newNote = req.body;

})

// Listener

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});