const express=require('express')
const app=express()
const mongoose=require('mongoose')
const router=require('./routes/route')
const multer=require('multer')
require('dotenv').config()

app.use(express.json())
app.use(multer().any())
mongoose.connect(process.env.cluster, {useNewUrlParser: true})
.then(()=>console.log("mongoose connected"))
.catch((err)=>console.log(err))

app.use('/',router)


app.listen(process.env.PORT,()=>console.log(`Express app running at:${process.env.PORT}`))
