import React, {useState, useEffect} from 'react'
import Header from '../../components/Header'
import Layout from '../../components/Layout'
import MainLayout from '../../components/MainLayout'
import Input from '../../components/Input'
import Button from '../../components/Button'
import toast from 'react-hot-toast'

import { urls } from '../../config/endpoints'

export default function AddProducts() {
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState({name: '', price: 0, description: ''})
    const [prodImg, setProdImg] = useState(null)
    const onChange = e => setState({...state, [e.target.name]: e.target.value})
    const onFile = e => {
        setProdImg(e.target.files[0])
    }
    const onSubmit = e => {
        e.preventDefault()
        setLoading(true)
        const {name, price, description} = state
        const admin = localStorage.getItem('et-admin')
        if(!(name && price && description)){
            toast.error('Product name, price and description cannot be empty')
            setLoading(false)
            return
        }

        if(!prodImg){
            toast.error('Product image is required')
            setLoading(false)
            return
        }
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', price)
        formData.append('admin', admin)
        formData.append('description', description)
        formData.append('img', prodImg)
        const context = {
            method: 'POST',
            headers:{'enctype': 'multipart/form-data'},
            body: formData
        }
        fetch(urls.addProductURL, context)
        .then(response=>response.json())
        .then(response=>{
            if(response.status){
                toast.success(response.message)
                setState({name: '', price: 0, description: ''})
                setProdImg(null)
                e.target.reset()
            }else{
                toast.error(response.message)
            }
        })
        .catch(error=>{
            toast.error(error.message)
        })
        .finally(()=>setLoading(false))
    }
    const links = [
        {title: 'Admin Dashboard', link: '/admin/'},
        {title: 'Add Product', link: '/admin/addproduct'},
    ]
  return (
    <>
        <Header title="ET - SHOP | Add Products" subtitle={links} />
        <br />
        <br />
        <Layout className="width-50 margin-auto">
            <MainLayout title="Add Products">
                <div className="padding-all-20">
                    <form onSubmit={onSubmit}>
                        <div>
                            <label>Product Name</label>
                            <Input type="text" onChange={onChange} value={state.name} name="name" className="input" />
                        </div>
                        <br />
                        <div>
                            <label>Product Price</label>
                            <Input type="number" onChange={onChange} min="0" value={state.price} name="price" className="input" />
                        </div>
                        <br />
                        <div>
                            <label>Description</label>
                            <textarea value={state.description} name="description" onChange={onChange} />
                        </div>
                        <div>
                            <label>Product Image</label>
                            <Input onChange={onFile} type="file" className="input" />
                        </div>
                        <br />
                        <hr />
                        <br />
                        <div className="flex-row-reverse">
                            <Button name="Add Product" loading={loading} />
                        </div>
                    </form>
                </div>
            </MainLayout>
        </Layout>
        <br />
        <br />
    </>
  )
}
