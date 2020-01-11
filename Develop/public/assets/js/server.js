const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");
const notesapi = require("../../../db/db.json");


const app = express();
const readFileAsync = util.promisify(fs.readFile);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT  || 3000;

app.get("/", function(req, res){                        //Sends homepage, index.html
    res.sendFile(path.join(__dirname,"../../index.html"))
})

app.get("/notes", function(req, res){                  //Sends notes page, notes.html
    res.sendFile(path.join(__dirname,"../../notes.html"))
})

app.get("/api/notes", function(req, res){//async function(req,res){                //sends JSON objects
    res.json(notesapi)
})

app.post("/api/notes", function(req, res){
    req.body.id = notesapi.length + 1;
    notesapi.push(req.body);
    // console.log(req);
    
    res.json(true);
})

// app.delete("/api/notes/:id", function(req, res){
//     let reqid;
//     for(i = 0; i < notesapi.length; i++){
//         if(notesapi[i] === req.body.id){
//             reqid = i;
//         }
//     }

// })

app.listen(PORT,function(req,res){                      //Logs that server is running
    console.log("listening on port " + PORT);    
});