import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
 export let CartContext = createContext();
 export default function CartContextProvider(props){
    const [numOfCart, setnumOfCart] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [cartId, setCartId] = useState(0)


    let headers ={
        token:localStorage.getItem("UserToken")
    }
async function addToCart(productId){
return await axios.post("https://ecommerce.routemisr.com/api/v1/cart",{productId},{headers}).then((reponse)=>{
toast.success(reponse.data.message)
setnumOfCart(reponse.data.numOfCartItems)
setTotalPrice(reponse.data.data.totalCartPrice)
return reponse
}).catch((err)=>{
toast.error(response.data.message)
    return err
})
}
async function getCart(){
return await axios.get("https://ecommerce.routemisr.com/api/v1/cart",{headers}).then((response)=>{ 
    setCartId(response.data.cartId)
    setnumOfCart(response.data.numOfCartItems)
    setTotalPrice(response.data.data.totalCartPrice)
    return response
}).catch((err)=>{
    return err
})
}
async function removeCartItem(productId){
    return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{headers}).then((reponse)=>{
        setnumOfCart(reponse.data.numOfCartItems)
        setTotalPrice(reponse.data.data.totalCartPrice)
        toast.success("Item Removed Successfully From Your Cart")
        return reponse
    }).catch((err)=>{
    toast.error(response.data.status)
        return err
    })
}
async function clearCart(){
    return await axios.delete("https://ecommerce.routemisr.com/api/v1/cart",{headers}).then((reponse)=>{
    toast.success("Your Cart has been cleared")
    setnumOfCart(reponse.data.numOfCartItems)
    setTotalPrice(0)

        return reponse
    }).catch((err)=>{
    toast.error(response.data.message)
        return err
    })
}
async function updateCart(productId , count){
    return await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count},{headers}).then((reponse)=>{
   toast.success("Product Updated")
   setnumOfCart(reponse.data.numOfCartItems)
   setTotalPrice(reponse.data.data.totalCartPrice)
        return reponse
    }).catch((err)=>{
        return err
    })
    }
async function checkout(cartId ,url,formData){
    return await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,{shippingAddress:formData},{headers}).then((response)=>{
        return response

    }).catch((err)=>{
        return err
    })
    }
    return <CartContext.Provider value={{ addToCart,getCart ,removeCartItem ,updateCart ,clearCart,numOfCart,totalPrice ,checkout ,cartId} }>
        {props.children}
    </CartContext.Provider>
 }