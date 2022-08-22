var express=require('express')
var route=require("./route.js")
var app=express()
app.use(express.json())
app.use("/item",route)

app.listen(5000,function(){
    console.log("server started")
})