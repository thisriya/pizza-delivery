const User= require('../../models/user')
const bcrypt= require('bcrypt')
const passport= require('passport')
function auth_controller(){
    return {
       login(req,res){
           res.render('auth/login')
       },
    //    postlogin(req , res , next){
    //        passport.authenticate('local', (err, user, info)=>{
    //             if(err){
    //                 req.flash('error', info.message)
    //                 return next(err)
    //             }
    //             if(!user){
    //                 req.flash('error', info.message)
    //                 return res.redirect('/login')
    //             }
    //             req.login(user, (err)=>{
    //                  if(err){
    //                     req.flash('error',info.message)
    //                     return next(err)
    //                  }
    //                  return res.redirect('/')
    //             })
    //        })(req, res, next)
    //    },

       register(req,res){
        res.render('auth/register')
       },
       async postregister(req,res){
        const {name,email,password} = req.body
        if(!name || !email || !password){
           req.flash('error','All fields must be filled!')
           req.flash('name',name)
           req.flash('email',email)
           return res.redirect('/register')      
        }

        //checking for same email
        const userExists = await User.exists({ email: email });
            if(userExists){
                req.flash('error','Sorry Email Already Taken!')
                req.flash('name',name)
                req.flash('email',email)
                return res.redirect('/register')  
            }
        

        //encrypting password
        const hashedpassword= await bcrypt.hash(password,10)
        //creating user 
        const user=new User({
            name:name,
            email:email,
            password:hashedpassword
        })

        try{
        user.save().then((user)=>{
            return res.redirect('/')
           })
        }
        catch(err){
            req.flash('error','Something went wrong!')
            return res.redirect('/register')
        }

        console.log(req.body)
       }
    } 
}

module.exports=auth_controller