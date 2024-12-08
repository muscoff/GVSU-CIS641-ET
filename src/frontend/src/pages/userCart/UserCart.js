import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header'
import Layout from '../../components/Layout'
import MainLayout from '../../components/MainLayout'
import { Oval } from 'react-loader-spinner';

import { FiTrash } from "react-icons/fi";
import { urls } from '../../config/endpoints';
import toast from 'react-hot-toast';

export default function Index() {
  const navigation = useNavigate()
  const [loading, setLoading] = useState(false)
  const [cart, setCart] = useState([])
  const [total, setTotal] = useState(0)
  const [details, setDetails] = useState(null)

  const removeItem = ind => {
    const newCart = [...cart]
    newCart.splice(ind, 1)
    localStorage.setItem('et-cart', JSON.stringify(newCart))
    return setCart(newCart)
  }

  const goToShop = () => navigation('/user/shop')

  const cartList = cart.length > 0 ? cart.map((item, i)=>(
    <React.Fragment key={i}>
      <div className="width-100 item-card flex-row align-items-center">
        <div className="width-30 width-lx-30 width-l-30 width-m-35 width-s-40">
          <img className="img" src={item.img.split('/')[0] === 'http' ? item.img : `http://${item.img}`} />
        </div>
        <div className="width-65 width-lx-65 width-l-65 width-m-60 width-s-50">
          <div className="font-gotham capitalize">{item.name}</div>
          <div>${item.price}</div>
        </div>
        <div className="width-lx-5 width-l-5 width-m-5 width-s-10 flex-row-reverse">
          <FiTrash 
            onClick={()=>removeItem(i)} 
            className="cursor-pointer font-20 black-text red-hover" 
          />
        </div>
      </div>
      <br />
    </React.Fragment>
  )) : (<>
    <div>
      Your cart is currently empty. 
      Consider going to <span onClick={()=>goToShop()} className="blue-text yellow-hover cursor-pointer">shop</span> and 
      add items to your cart
    </div>
  </>)

  const getCartItems = () => {
    const cartItems = JSON.parse(localStorage.getItem('et-cart')) || []
    const userDetails = JSON.parse(localStorage.getItem('et-user-details')) || null
    setCart(cartItems)
    setTotal(cartItems.reduce((acc, curr) => acc + Number(curr.price), 0))
    setDetails(userDetails)
  }

  useEffect(()=>{
    getCartItems()
  }, [])

  const checkout = () => {
    if(cart.length === 0 || details === null) return
    setLoading(true)
    const processCart = cart.map(item=>{
      item['processed'] = false
      item['price'] = Number(item['price'])
      return item
    })
    const body = {cart: processCart, details}
    const context = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
    fetch(urls.checkoutURL, context)
    .then(res=>res.json())
    .then(res=>{
      const {status, message} = res
      if(status){
        toast.success(message)
        localStorage.removeItem('et-cart')
        navigation('/user/shop')
        return
      }
      toast.error(message)
    })
    .catch(err=>toast.error(err.message))
    .finally(()=>setLoading(false))
  }

  const links = [
    {title: 'ET - Shop', link: '/user/shop'},
    {title: 'Cart', link: '/user/cart'},
  ]

  return (
    <>
      <Header title="Cart" subtitle={links} />
      <br />
      <Layout>
        <div className="row">
          <div className="col-8 col-lx-12 col-l-12 col-m-12 col-s-12 padding-all-10">{cartList}</div>
          <div className="col-4 col-lx-6 col-l-6 col-m-8 col-s-12 padding-all-10">
            {cart.length > 0 && (
            <MainLayout title="Checkout">
              <div className="padding-all-10">
                <div><span className="bold-text">Total Amount:</span> ${total}</div>
                <div><span className="bold-text">Total Items:</span> {cart.length}</div>
                <br />
                <button 
                  className="red-bg white-text width-100 bold-text cursor-pointer flex-column justify-content-center align-items-center"
                  onClick={checkout}
                >
                  {
                    !loading
                    ?
                    'Checkout'
                    :
                    <>
                      <Oval 
                        visible={true}
                        height="30"
                        width="30"
                        color="#fff"
                        secondaryColor='#fff'
                      />
                    </>
                  }
                </button>
              </div>
            </MainLayout>
            )}
          </div>
        </div>
      </Layout>
      <br />
    </>
  )
}
