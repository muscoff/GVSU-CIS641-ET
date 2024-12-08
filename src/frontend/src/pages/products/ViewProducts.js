import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header'
import Layout from '../../components/Layout'
import MainLayout from '../../components/MainLayout'
import toast from 'react-hot-toast'
import { FiEdit3 } from "react-icons/fi";

import { urls } from '../../config/endpoints'

export default function ViewProducts() {
    const navigation = useNavigate()
    const [products, setProducts] = useState([])
    const viewSingleProduct = id => navigation(`/admin/viewproduct/${id}`)
    const links = [
        {title: 'Admin Dashboard', link: '/admin/'},
        {title: 'View Products', link: '/admin/viewproduct'},
    ]
    const thead = ['No', 'Product Name', 'Product Price', 'Action'].map((item, index)=>(
        <React.Fragment key={index}>
            <th>{item}</th>
        </React.Fragment>
    ))

    const tbody = products.length === 0 ? <></> : products.map((item, i)=>{
        return (
            <tr key={item.id}>
                <td>{i+1}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>
                    <FiEdit3 className="cursor-pointer" onClick={()=>viewSingleProduct(item.id)} />
                </td>
            </tr>
        )
    })

    const getProducts = (admin) => {
        fetch(`${urls.getProductsURL}/${admin}`)
        .then(response=> response.json())
        .then(response => {
            if(response.status) setProducts(response.data)
        })
        .catch(err=>toast.error(err.message))
    }
    useEffect(()=>{
        const admin = localStorage.getItem('et-admin')
        getProducts(admin)
    }, [])
  return (
    <>
        <Header title="ET - SHOP | View Products" subtitle={links} />
        <br />
        <br />
        <Layout>
            <MainLayout title="View Products">
                <div className="padding-all-20">
                    <div>
                        <table className="table bordered">
                            <thead><tr>{thead}</tr></thead>
                            <tbody>{tbody}</tbody>
                        </table>
                    </div>
                </div>
            </MainLayout>
        </Layout>
    </>
  )
}
