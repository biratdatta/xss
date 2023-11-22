const express = require("express");
const fs = require("fs")
const app = express();

const products = ["Apple"]
app.use(express.json());



app.get("/search", (req, res) => {
    let ind = fs.readFileSync(__dirname + "/index.html")
    
    const s = "Could not find product " + req.query.q;
    ind = ind.toString().replace("<!-- SEARCH -->", s);
    //This code is used to highlight not to take Script code except your port. 
    //<script>alert('Hello')</script> Try this for example in the dialouge box and without the script to show it taking JS and uncooment the script and do it. 
    
    // res.setHeader("Content-Security-Policy", "script-src http://localhost:8080")
     
    res.send(ind);
})

app.get ("/js", (req, res )=> {
    res.sendFile(__dirname + "/src.js")
});

app.get("/", (req, res) => {
    let ind = fs.readFileSync(__dirname + "/index.html")
    
    const s = products.reduce((a, c) => {
        return `${a}<li>${c}</li>`
    }, "")
    ind = ind.toString().replace("<!-- LIST -->", s);
    // res.setHeader("Content-Security-Policy", "script-src http://localhost:8080")
     
    res.send(ind);
})

app.get("/products", (req, res) => {

   res.send(products)
})

 
app.post("/products", (req, res) => {

    products.push(req.body.name);
    res.send({"success":true})
})

app.listen(8080);

console.log("Listen to 8080")




 