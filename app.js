const express = require("express")
const bodyParser = require("body-parser")

const app=express();

var items = ["By food","cook food","eat food"]
let workItems =[];
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine','ejs');
app.use(express.static("public"));

app.get("/",function(req,res){
    var today=new Date();
    var options = {
        weeekday : "long",
        day : "numeric",
        month : "long"
    };
    var day=today.toLocaleDateString("en-US",options);
    res.render("list",{listTitle: day, newListItems:items});
    
});

app.post("/",function(req,res){
    
    let item=req.body.newItem
    if(req.body.list === "Work List "){
        workItems.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }
})

app.get("/work",function(req,res){
    res.render("list",{listTitle: "Work List",newListItems: workItems});
});


app.listen("3000",function(){
    console.log("Server is running on Port 3000")
})