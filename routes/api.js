const express = require("express");
const path = require("path");
let notes = require("../db/notes");
const fs = require("fs");

// APP and PORT


const app = express();
const PORT = 5000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('../'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
/*fs.writeFileSync("../db/notes.json", function(err){
    if (err) {
        return console.log(err);
    }
});*/

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});
app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
}); 
    
app.post("/api/notes", function(req, res){

   let newNotes = (req.body);
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
})

// Listener

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});