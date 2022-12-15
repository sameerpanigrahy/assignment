const userModel=require('../Model/userModel')
const studentModel=require('../Model/studentModel')
const { validName,validNumber,isValidObjectId} = require('./validator')



module.exports={
    createStudent:async (req,res)=>{
        try {
            const data=req.body
            const Error={}
            let {Name,subject,marks}=data
        if (Object.keys(data).length == 0) {
                Error.InvaileBody = "please provide a valied request Body"
            }else if(!Name||!subject||!marks){
                Error.InvailedFields = "request body missing some mandatory Fields"
            }else{
                if (!validName(Name)) {
                    Error.InvalidName = "Valid name should not cantain any special character & it shoud be between 3-20 char "
                }
                const array=["Math","English","Hindi","Science","JavaScript","SS"]
                if(!array.includes(subject)){
                    Error.InvalidSubject = " [Math,English,Hindi,Science,JavaScript,SS] these are only valid subject"
                }
                if(!validNumber(marks)){
                    Error.InvalidMark = "valid mark shoub be a number"
                }
            }
            if (Object.keys(Error).length > 0) return res.status(400).send({ status: false, message: Error })
            const userId=req.userId
          const findstudent=await studentModel.findOneAndUpdate({Name:Name,subject:subject,userId:userId,isDeleted:false},{$inc:{marks:marks}},{new:true})
          if(findstudent){
            return res.status(200).send({status:true,message:"student is alrady exist",data:findstudent})
          }
          const obj={
            Name:Name,
            subject:subject,
            marks:marks,
            userId:userId,
            isDeleted:false
          }

        const saveData=await studentModel.create(obj)
        res.status(201).send({status:true,message:"student data successfully regisetred",data:saveData})
        } catch (error) {
            res.status(500).send({status:false,message:error.message})
        }
    },
    findByQuery:async (req,res)=>{
        try {
            const {Name,subject}=req.query
            const Error={}
            if (!Name) Error.Invalidquery="please provide name"
            if (!subject) Error.Invalid="please provide name"
            if(Object.keys(Error).length>0) return res.status(400).send({status:false,message:Error})
            const obj={userId:req.userId,isDeleted:false}
            obj.Name = { "$options": "i", "$regex": Name }
            obj.subject= subject
            const student=await studentModel.find(obj)
            if(student.length==0) return res.status(400).send({status:false,message:"student not faound"})
            res.status(200).send({status:true,message:"Here is your data",data:student})
        } catch (error) {
            res.status(500).send({status:false,message:error.message})
        }
    },
    updateStudent:async (req,res)=>{
        try {
            const objectId=req.params.studentId
            if(!isValidObjectId(objectId)) return res.status(400).send({status:false,message:"Object Id Is not valid"})
            const {marks}=req.body
            if(!marks) return res.status(400).send({status:false,message:"please provide mark for update"})
            const student=await studentModel.findOneAndUpdate({userId:req.userId,_id:objectId,isDeleted:false},{marks:marks},{new:true})
            if(!student) return res.status(400).send({status:false,message:"student not faound"})
            res.status(200).send({status:true,message:"Successfully Updated",datra:student})
        } catch (error) {
            res.status(500).send({status:false,message:error.message})
        }
    },
    findById:async (req,res)=>{
        try {
            const objectId=req.params.studentId
            if(!isValidObjectId(objectId)) return res.status(400).send({status:false,message:"Object Id Is not valid"})
            const student=await studentModel.findOne({userId:req.userId,_id:objectId,isDeleted:false})
            if(!student) return res.status(400).send({status:false,message:"student not faound"})
            res.status(200).send({status:true,message:"Here is your data",data:student})
        } catch (error) {
            res.status(500).send({status:false,message:error.message})
        }
    },
    deleteStudent:async (req,res)=>{
        try {
            const objectId=req.params.studentId
            if(!isValidObjectId(objectId)) return res.status(400).send({status:false,message:"Object Id Is not valid"})
            const student=await studentModel.findOneAndUpdate({userId:req.userId,_id:objectId,isDeleted:false},{isDeleted:true})
            if(!student) return res.status(400).send({status:false,message:"student not faound"})
            res.status(200).send({status:true,message:"Successfully Deleted"})
        } catch (error) {
            res.status(500).send({status:false,message:error.message})
        }
    },

}