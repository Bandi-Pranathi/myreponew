const express= require('express')
const router=express.Router()
const jwt=require('jsonwebtoken')
const secret=require("./secret.js")
var itemarray=require("./itemarray.js")

function getToken(obj)
{
return jwt.sign(obj,secret)
}
function validatetoken(obj,secret)
{
    return jwt.verify(obj,secret)
}

router.get("/viewitem",(req,res)=>{
    res.send(itemarray)
})
router.get("/viewitem/:token/:secret",(req,res)=>{
    var token=req.params.token
    var secret=req.params.secret
    var auth=validatetoken(token,secret)
    console.log(token)
    console.log(secret)
    if(auth)res.send(itemarray)
   else res.send("invalid details")
})

router.post("/additem",(req,res)=>{
    itemarray.push(req.body)
    req.statusCode=200
res.send("item added"+req.body)})

// router.post("/register",(req,res)=>{

//     var authinfo={
//         "token":getToken(req.body),
//         "secret":secret
//     }
//     res.send(authinfo)
// })

router.patch("/updateitem",(req,res)=>{
    var item=req.body
    var narray=itemarray.filter((e)=>{
        e.iname!=item.iname
    })
    narray.push(item)
    itemarray=narray
    console.log(itemarray)
    res.send("updated")
})

// router.delete("/deleteitem",(req,res)=>{
//     for(let x in itemarray)
//     {
//         if(itemarray[x].iname==req.body.iname)
//         {
//             delete itemarray[x];
//         }
//     }

//     res.send("deleted")
// })

module.exports=router