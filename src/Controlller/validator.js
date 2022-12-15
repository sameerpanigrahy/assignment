const mongoose=require('mongoose')

module.exports = {
     validName:(name)=>{
        if(typeof name !== 'string') return false
        return /^[a-zA-Z. ]{3,20}$/.test(name)
    },
     validMail:(email)=>{
        if(typeof email !== 'string') return false
        return /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)
    },
    validPassword:(password)=> {
        if(typeof password !== 'string') return false
        if (  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,12}$/.test(password) ) return true;
    },
    validNumber:(Number)=>{
        if(typeof Number !== 'string') return false
        return /^[0-9]{1,3}$/.test(Number)
    },
    isValidObjectId:(ObjectId)=>{
        if(mongoose.isValidObjectId(ObjectId)) return true
        return false      
    }

}