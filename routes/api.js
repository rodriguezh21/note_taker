const express = require("express");
const path = require("path");
let notes = require("../db/notes");
const fs = require("fs");
const uuidv4 = require("uuid/v4");
// APP and PORT


const app = express();
var PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('../'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});
app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
}); 
    
app.post("/api/notes", function(req, res){

   let newNotes = (req.body);
   newNotes.id = uuidv4();
   notes.push(newNotes); 
   fs.readFileSync("../db/notes.json", notes, function(err){
       if (err) {
        return console.log(err);
   }
   });
   fs.writeFileSync("../db/notes.json", JSON.stringify(notes), function(err){
        if (err) {
            return console.log(err);
        }
    });
     res.json(newNotes);
     console.log(json(newNotes.id))
})

app.get("/api/note", function(req,res){
    res.json(notes);
})

app.delete("/api/notes/:id", function(req, res){
    notes = notes.filter(note => note.id != req.params.id)
    
    fs.writeFile("../db/notes.json", JSON.stringify(notes), function(err){
        if (err) {
            return console.log(err);
        }
        res.send(notes)
    });
})
// Listener

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});