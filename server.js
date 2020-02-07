const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");
const notesapi = require("./db/db.json");


const app = express();
const readFileAsync = util.promisify(fs.readFile);

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT  || 3002;

app.get("/", function(req, res){                        //Sends homepage, index.html
    res.sendFile(path.join(__dirname,"/public/index.html"))
})

app.get("/notes", function(req, res){                  //Sends notes page, notes.html
    res.sendFile(path.join(__dirname,"/public/notes.html"))
})

app.get("/api/notes", function(req, res){//async function(req,res){                //sends JSON objects
    res.json(notesapi)
})

app.post("/api/notes", function(req, res){
    req.body.id = notesapi.length + 1;
    var newNote = req.body
    notesapi.push(req.body);
    // console.log(newNote);
    fs.readFile("./db/db.json", "UTF-8", function(err, data){
        if(err){
            throw err;
        }
        else{
            var fileContents = JSON.parse(data)
            fileContents.push(newNote);
            var backToFile = JSON.stringify(fileContents)
            fs.writeFile("./db/db.json", backToFile, "UTF-8", function(err, data){
                if(err){
                    throw err;
                }
                else{
                    console.log("File updated");
                }
            })  
        }     
    res.json(true);
    });
});

app.delete("/api/notes/:id", function(req, res){
    const id = parseInt(req.params.id)
    fs.readFile("./db/db.json", "UTF-8", function(err, data){
        if(err){
            throw err;
        }
        else{
            var fileContents = JSON.parse(data)   
            for(i = 0; i < fileContents.length; i++){
                if(fileContents[i].id === id){
                    fileContents.splice(i, 1);
                    console.log(fileContents);
                    backToFile = JSON.stringify(fileContents);
                    fs.writeFile("./db/db.json", backToFile, "UTF-8", function(err, data){
                        if(err){
                            throw err;
                        }
                        else{
                            console.log("File updated");   
                        }
                    })  
                }
            }
        }
    })
    res.send("Note deleted.")
})

app.listen(PORT,function(req,res){                      //Logs that server is running
    console.log("listening on port " + PORT);    
});