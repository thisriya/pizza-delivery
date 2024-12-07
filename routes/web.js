const home_controller=require('../app/http/controller/home_controller')
const auth_controller=require('../app/http/controller/auth_controller')
const cart_controller=require('../app/http/controller/customer/cart_controller')
function init_routes(app){
    app.get('/', home_controller().index)

    app.get('/login',auth_controller().login)
    // app.post('/login',auth_controller().postlogin)
    
    app.get('/register', auth_controller().register)
    app.post('/register', auth_controller().postregister)
    
    app.get('/cart',cart_controller().index)
    app.post('/update-cart',cart_controller().update)
}

module.exports=init_routes