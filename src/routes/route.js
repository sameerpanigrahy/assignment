const express=require('express')
const router=express.Router()
const {createUser,logInUser}=require('../Controlller/userController')
const{authentication}=require('../Controlller/auth')
const {createStudent,findByQuery,findById,deleteStudent,updateStudent}=require('../Controlller/studentController')
router.get('/test-me',(req,res)=>{
    res.status(200).send({status:true,message:"This my first API"})
})
//....................................Testing API...........................//

router.post('/createUser',createUser)
router.post('/logInUser',logInUser)


//..............................User API........................................//


router.post('/createStudent',authentication,createStudent)
router.get('/findByQuery',authentication,findByQuery)
router.put('/deleteStudent/:studentId',authentication,updateStudent)
router.get('/findById/:studentId',authentication,findById)
router.delete('/deleteStudent/:studentId',authentication,deleteStudent)





router.all("/*", (req, res) => { res.status(400).send({ status: false, message: "Endpoint is not correct plese provide a proper end-point" }) })


module.exports=router