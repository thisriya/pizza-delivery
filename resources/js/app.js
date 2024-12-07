import axios from 'axios'
import Noty from 'noty'
let addtocart=document.querySelectorAll('.add-to-cart')
let cartcounter=document.querySelector('#cartcounter')


function updateCart(pizza){
      axios.post('/update-cart',pizza).then(res=>{
      cartcounter.innerText=res.data.totalqty
      new Noty({
        type:'success',
        timeout: 1000,
        text: "Item added to cart!"
      }).show();
      }).catch(err =>{
        new Noty({
            type:'error',
            timeout: 1000,
            text: "Something went wrong!"
          }).show();
      })
}
addtocart.forEach((btn)=>{
        btn.addEventListener('click',(e)=>{
            let pizza=JSON.parse(btn.dataset.pizza)
            updateCart(pizza)
        })
})