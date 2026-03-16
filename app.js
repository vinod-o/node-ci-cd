const express = require("express")
const app = express()

app.get("/", (req,res)=>{
res.send("Hello DevOps CI/CD Pipeline")
})

app.listen(3000)