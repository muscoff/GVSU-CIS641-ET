import React, {useState, useEffect} from 'react'
import Header from '../../components/Header'
import Collection from '../../components/Collection'
import CollectionL from '../../components/CollectionL'
import Layout from '../../components/Layout'
import { urls } from '../../config/endpoints'

export default function Orders() {
    const [orders, setOrders] = useState([])
    const [processed, setProcessed] = useState([])
    const [unprocessed, setUnprocessed] = useState([])
    const [user, setUser] = useState(null)
    const getOrders = () => {
        const data = localStorage.getItem('et-user')
        fetch(`${urls.getOrdersURL}?user=${data}`)
        .then(res=>res.json())
        .then(res=>{
            if(res.status){
                setProcessed(res.processedCart ?? [])
                setUnprocessed(res.unprocessedCart?? [])
            }
        })
        .catch(err=>console.log(err.message))
    }

    const processedList = processed.length === 0 ? <></> : processed.map((el, ind)=>(
        <React.Fragment key={ind}>
            <CollectionL className="cursor-pointer yellow-hover" title={`Order Date: ${el.date}`}>
                {el.cart.length > 0 && (
                    <>
                        {el.cart.map((item, i)=>(
                            <React.Fragment key={i}>
                                <div className="width-100 item-card flex-row align-items-center">
                                <div className="width-30 width-lx-30 width-l-30 width-m-35 width-s-45">
                                    <img className="img" src={item.img.split('/')[0] === 'http' ? item.img : `http://${item.img}`} />
                                </div>
                                <div className="width-65 width-lx-65 width-l-65 width-m-60 width-s-55">
                                    <div className="font-gotham capitalize">{item.name}</div>
                                    <div>${item.price}</div>
                                </div>
                                </div>
                                <br />
                          </React.Fragment>
                        ))}
                    </>
                )}
            </CollectionL>
        </React.Fragment>
    ))

    const unprocessedList = unprocessed.length === 0 ? <></> : unprocessed.map((el, ind)=>(
        <React.Fragment key={ind}>
            <CollectionL className="cursor-pointer yellow-hover" title={`Order Date: ${el.date}`}>
                {el.cart.length > 0 && (
                    <>
                        {el.cart.map((item, i)=>(
                            <React.Fragment key={i}>
                                <div className="width-100 item-card flex-row align-items-center">
                                <div className="width-30 width-lx-30 width-l-30 width-m-35 width-s-45">
                                    <img className="img" src={item.img.split('/')[0] === 'http' ? item.img : `http://${item.img}`} />
                                </div>
                                <div className="width-65 width-lx-65 width-l-65 width-m-60 width-s-55">
                                    <div className="font-gotham capitalize">{item.name}</div>
                                    <div>${item.price}</div>
                                </div>
                                </div>
                                <br />
                          </React.Fragment>
                        ))}
                    </>
                )}
            </CollectionL>
        </React.Fragment>
    ))

    useEffect(()=>{
        getOrders()
    }, [])
    const links = [
        {title: 'ET - Shop', link: '/user/shop'},
        {title: 'My Orders', link: '/user/orders'},
    ]
  return (
    <>
        <Header title="My Orders" subtitle={links} />
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
