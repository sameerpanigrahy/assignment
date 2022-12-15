const jwt=require('jsonwebtoken')
const mongoose=require('mongoose')
require('dotenv').config()

module.exports={
    authentication:async (req,res,next)=>{
     try {
        let token = req.headers["authorization"]
        if(!token) return res.status(400).send({status:false,message:"token must be present"})
          token=token.split(' ')
        jwt.verify(token[1], process.env.key, (error, decodedToken) =>  {
            if (error) {
                let message = (error.message == "jwt expired" ? "token is expired ,please login again" : "token is invalid,please recheck your token")
                return res.status(401).send({ status: false, msg: message })
            }
            req.userId = decodedToken.userId;
            next();
        })
     } catch (error) {
        res.status(500).send({staus:false,message:error.message})
     }
    }
}