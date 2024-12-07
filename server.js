require('dotenv').config()
const express=require('express')
const app=express()
const PORT=process.env.PORT || 3300
const ejs=require('ejs')
const expressLayout=require('express-ejs-layouts')
const path=require('path')
const mongoose = require('mongoose');
const session=require('express-session')
const flash=require('express-flash')
const MongoDbStore=require('connect-mongo')
const passport=require('passport')
// const MongoDbStore=require('connect-mongo')

// Connect to MongoDB
const url = 'mongodb://localhost/pizza';
mongoose.connect(url, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify: false
})
.then(() => {
    console.log("Database Connected..");
})
.catch((err) => {
    console.log("Connection Failed:", err);
});
const connection = mongoose.connection;

//passport use
// const passportinit=require('./app/config/passport')
// passportinit(passport)
// app.use(passport.initialize())
// app.use(passport.session())

//session store
let mongoStore= MongoDbStore.create({
    mongoUrl: 'mongodb://localhost/pizza',
    collectionName: 'sessions'
});


//session 
app.use(session({
    secret:process.env.COOKIE_SECRET,
    resave:false,
    store: mongoStore,
    saveUninitialized:false,
    cookie:{maxAge: 1000 * 60 *60 *24}
}));

app.use(flash())

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use((req,res,next)=>{
   res.locals.session= req.session
   next()
})
app.use(expressLayout)
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')

require('./routes/web')(app)



app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
})