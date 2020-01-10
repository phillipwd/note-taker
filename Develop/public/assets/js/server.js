const express = require("express");
const path = require("path")
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT  || 3000;

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname,"../../index.html"))
})

app.listen(PORT,function(req,res){
    console.log("listening on port " + PORT);
    
});