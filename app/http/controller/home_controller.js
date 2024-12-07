const Menu=require('../../models/menu')
function home_controller(){
     return {
       async  index(req,res){

            const pizzas=await Menu.find()
            return res.render('home',{pizzas:pizzas})
           
            // Menu.find().then(function(pizzas){
            //     console.log(pizzas)
            //     res.render('home',{pizzas:pizzas})
            // })
           
        }
     } 
}

module.exports=home_controller