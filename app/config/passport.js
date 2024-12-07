// const LocalStrategy=require('passport-local').Strategy
// const user=require('../models/user')
// const session=require('express-session')
// const bcrypt=require('bcrypt')
// function init(passport){
//     passport.use(new LocalStrategy({ usernameField:'email' }, async (email,password,done)=>{
//         //checking for same email
//         const user=await User.findOne({email:email})
//         if(!user){
//             return done(null,false, {message:"Sorry No user found with this email"})
//         }
        
//         bcrypt.compare(password,user.password).then(match=>{
//             if(match){
//                 return done(null, user, {message: "Logged In successfully"})
//             }
//             return done(null, false, {message: "Wrong Username or Password"})
//         })
//  }))

//      passport.serializeUser((user, done)=>{
//         done(null , user._id)
//      })

//      passport.deserializeUser((id, done)=>{
//         User.findById(id,(err,user)=>{
//             done(err, user)
//         })
//      })
// }

// module.exports=init