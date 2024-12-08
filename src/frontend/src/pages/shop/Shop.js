import React, {useState, useEffect} from 'react'
import Header from '../../components/Header'
import Layout from '../../components/Layout'
import { urls } from '../../config/endpoints'
import toast from 'react-hot-toast'

export default function Shop() {
  const [products, setProducts] = useState([])
  const [allProd, setAllProd] = useState([])
  const [cart, setCart] = useState([])

  const addToCart = item => {
    if(cart.length === 0) {
      toast.success('Item added to cart')
      localStorage.setItem('et-cart', JSON.stringify([item]))
      return setCart([item])
    }
    const findItem = cart.find(c=>c.id === item.id)
    if(findItem) {
      return toast.error('Item already added to cart')
    }else{
      toast.success('Item added to cart')
      localStorage.setItem('et-cart', JSON.stringify([...cart, item]))
      return setCart([...cart, item])
    }
  }

  const productList = products.map((item, index)=>(
    <React.Fragment key={index}>
      <div className="col-3 col-lx-4 col-l-4 col-m-6 col-s-12 padding-all-10">
        <div>
          <img 
            className="img"
            src={item.img.split(':')[0] === 'http' ? item.img : `http://${item.img}`} 
          />
        </div>
        <div className="capitalize">{item.name}</div>
        <div>${item.price}</div>
        <div>
          <button 
            className="add font-gotham blue-bg white-text cursor-pointer"
            onClick={()=>addToCart(item)}
          >
            Add
          </button>
        </div>
      </div>
    </React.Fragment>
  ))

  const getProducts = () => {
    fetch(urls.getAllProductsURL)
    .then(response=>response.json())
    .then(res=>{
      if(res.status) {
        setProducts(res.data)
        setAllProd(res.data)
      }
    })
    .catch(err=>console.log(err.message))
  }

  const getCart = () => {
    const cartData = JSON.parse(localStorage.getItem('et-cart'))
    if(cartData) setCart(cartData)
  }

  useEffect(()=>{
    getProducts()
    getCart()
  }, [])

  const onSearch = e => {
    const val = e.target.value.toLowerCase()
    if(val === '') return setProducts(allProd)
    const arr = []
    
    allProd.forEach(p=>{
      if(p.name.toLowerCase().indexOf(val) > -1) arr.push(p)
    })
    return setProducts(arr)
  }

  const links = [
    {title: 'ET - Shop', link: '/user/shop'},
  ]
  return (
    <>
      <Header title="Shop" subtitle={links} />
      <br />
      <Layout>
        <div className="flex-row-reverse">
          <div><input onChange={onSearch} type="search" placeholder="Search for a product" /></div>
        </div>
        <br />

        <div className="row">{productList}</div>
      </Layout>
      <br />
      <br />
    </>
  )
}
