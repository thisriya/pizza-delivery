function cart_controller(){
    return {
       index(req,res){
           
           res.render('customer/cart')
       },
       update(req,res){
        // let cart={
        //     items:{
        //         pizzaid:{item:pizzaobject,qty:0},
        //     },
        //     totalqty:0,
        //     totalprice:0
        // }
        if(!req.session.cart){
            req.session.cart={
                items:{},
                totalqty:0,
                totalprice:0
            }
        }
        let cart=req.session.cart
        console.log(req.body)
        if(!cart.items[req.body._id]){
            cart.items[req.body._id]={
                item:req.body,
                qty:1
            }   
            cart.totalqty=cart.totalqty+1
            cart.totalprice=cart.totalprice+ req.body.price
        } 
        else{
            cart.items[req.body._id].qty=cart.items[req.body._id].qty+1
            cart.totalqty=cart.totalqty+1
            cart.totalprice=cart.totalprice + req.body.price
        }
        return res.json({totalqty: req.session.cart.totalqty})
       }
      
    } 
}

module.exports=cart_controller