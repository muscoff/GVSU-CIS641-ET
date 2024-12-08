import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'
import { urls } from '../../config/endpoints'
import Layout from '../../components/Layout'
import Collection from '../../components/Collection'
import CollectionL from '../../components/CollectionL'
import { FcCheckmark } from "react-icons/fc"
import { FiTruck } from "react-icons/fi"
import toast from 'react-hot-toast'

const Details = ({ details }) => {
    const {fullname, email, phone} = details
    return (
        <>
            {
                fullname && (
                    <div>
                        <label className="bold-text">Fullname</label><br />
                        <input value={fullname} title={fullname} disabled />
                    </div>
                )
            }
            {
                email && (
                    <div>
                        <label className="bold-text">Email</label><br />
                        <input value={email} title={email} disabled />
                    </div>
                )
            }
            {
                phone && (
                    <div>
                        <label className="bold-text">Phone</label><br />
                        <input value={phone} title={phone} disabled />
                    </div>
                )
            }
        </>
    )
}

export default function AdminOrders() {
    const [admin, setAdmin] = useState(null)
    const [processed, setProcessed] = useState([])
    const [unprocessed, setUnprocessed] = useState([])

    const getOrders = (data) => {
        fetch(`${urls.getOrdersURL}?admin=${data}`)
        .then(res=>res.json())
        .then(res=>{
            if(res.status){
                setProcessed(res.processedCart ?? [])
                setUnprocessed(res.unprocessedCart?? [])
            }
        })
        .catch(err=>console.log(err.message))
    }
    useEffect(()=>{
        const data = localStorage.getItem('et-admin')
        setAdmin(data)
        getOrders(data)
    }, [])

    const processedList = processed.length === 0 ? <></> : processed.map((el, ind)=>(
        <React.Fragment key={ind}>
            <CollectionL className="cursor-pointer yellow-hover" title={`Order Date: ${el.date}`}>
                {el.cart.length > 0 && (
                    <>
                        {el.cart.map((item, i)=>(
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
                                        {item.processed ? <FcCheckmark /> : <FiTruck />}
                                    </div>
                                </div>
                                <br />
                          </React.Fragment>
                        ))}
                        <CollectionL title="Details" className="red-hover cursor-pointer">
                            <Details details={el.details} />
                        </CollectionL>
                        <br />
                    </>
                )}
            </CollectionL>
        </React.Fragment>
    ))

    const processItem = (item, date) => {
        const findItem = unprocessed.find(unp=>unp.date === date)
        const itemCart = findItem?.cart?? null
        if(!itemCart || itemCart.length === 0) return
        const processedCart = itemCart.map(prod=>{
            if(item.id === prod.id) prod['processed'] = true
            return prod
        })
        const mapItems = unprocessed.map(el=>{
            if(el.date === date){
                el.cart = processedCart
                return el
            }
            return el
        })
        setUnprocessed(mapItems)
    }

    const submitRequest = (date) => {
        const findItem = unprocessed.find(item=>item.date === date)
        const itemCart = findItem?.cart ?? null
        if(!itemCart || itemCart.length === 0) {
            toast.error('No items to process')
            return
        }
        const filterprocessedCart = itemCart.filter(item=>item.processed === true)
        if(filterprocessedCart.length === 0){
            toast.error('No items to process')
            return
        }
        // console.log('filterprocessedCart',filterprocessedCart)
        const ids = filterprocessedCart.map(item=>{return {id: item.id, user: item.user}})
        const context = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({date, ids, admin})
        }

        fetch(urls.processOrdersURL, context)
        .then(res=>res.json())
        .then(res=>{
            if(res.status) return getOrders(admin)
            toast.error(res.message)
        })
        .catch(err=>toast.error(err.message))
    }

    const unprocessedList = unprocessed.length === 0 ? <></> : unprocessed.map((el, ind)=>(
        <React.Fragment key={ind}>
            <CollectionL className="cursor-pointer yellow-hover" title={`Order Date: ${el.date}`}>
                <div>
                    <button 
                        onClick={()=>submitRequest(el.date)}
                        className="add font-gotham blue-bg white-text cursor-pointer"
                    >SubmitRequest</button>
                </div>
                {el.cart.length > 0 && (
                    <>
                        {el.cart.map((item, i)=>(
                            <React.Fragment key={i}>
                                <div className="width-100 item-card flex-row align-items-center">
                                    <div className="width-30 width-lx-30 width-l-30 width-m-35 width-s-40">
                                        <img className="img" src={item.img.split('/')[0] === 'http' ? item.img : `http://${item.img}`} />
                                    </div>
                                    <div className="width-65 width-lx-65 width-l-65 width-m-60 width-s-50">
                                        <div className="font-gotham capitalize">{item.name}</div>
                                        <div>${item.price}</div>
                                    </div>
                                    <div className="width-lx-5 width-l-5 width-m-5 width-s-10 flex-row-reverse font-20">
                                        {item.processed ? <FcCheckmark /> : <FiTruck className="yellow-hover cursor-pointer" onClick={()=>processItem(item, el.date)} />}
                                    </div>
                                </div>
                                <br />
                            </React.Fragment>
                        ))}
                        <CollectionL title="Details" className="red-hover cursor-pointer">
                            <Details details={el.details} />
                        </CollectionL>
                        <br />
                    </>
                )}
            </CollectionL>
        </React.Fragment>
    ))

    const links = [
        {title: 'Admin Dashboard', link: '/admin/'},
        {title: 'Orders', link: `/admin/orders`},
    ]
  return (
    <>
        <Header title="ET - Shop | Orders" subtitle={links} />
        <br /><br />
        <Layout>
            <Collection title="Processed Orders">
                {processed.length > 0 && (<div className="padding-all-10">
                    {processedList}
                </div>)}
            </Collection>
            <br /><br />
            <Collection title="Unprocessed Orders">
                {unprocessed.length > 0 && (<div className="padding-all-10">
                    {unprocessedList}
                </div>)}
            </Collection>
        </Layout>
        <br /><br />
    </>
  )
}
