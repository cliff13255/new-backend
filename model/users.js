const mongoose=require('mongoose')
const validator=require('validator')
const argon2=require('argon2')
const ROLES=["admin","student","teacher","parent"]

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name must be included"],
        trim:true,
        validate:{
         validator: (value)=> /^[A-Za-z\s'-]+$/.test(value),
         message: "Name can only include letters,apostrophy,hyphen"
        },
        minLength:[3,"Name must exceed 3 characters"],
        maxLength:[150,"Name should be less than 150 characters"]
    },
    email:{
        type:String,
        required:[true,"Email must be included"],
        unique:true,
        lowercase:true,
        trim:true,
        validate:{
            validator: (value)=> validator.isEmail(value),
            message: 'Invalid email'
        }
    },
    role:{
        required:[true,"Role must be included"],
        type:String,
        trim:true,
        lowercase:true,
        enum:{
            values:ROLES,
            message:`Content must be one of these: ${ROLES.join(',')}`
        },
        default:"student"
    },
    password:{
        type:String,
        required:[true,"Password field is required"],
        minLength:[8,"Password must exceed 8 characters"],
        select:false
    }
},
{
    timestamps:true
})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();

    this.password= await argon2.hash(this.password,{type:argon2.argon2id})
    

})

userSchema.set('toJSON',{
    transform:function(doc,ret){
        delete ret.password;
        return ret;
    }
})

const User= mongoose.model('User',userSchema)

module.exports=User