import React, {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import Header from '../../components/Header'
import Layout from '../../components/Layout'
import MainLayout from '../../components/MainLayout'
import Input from '../../components/Input'
import Button from '../../components/Button'
import toast from 'react-hot-toast'

import { urls } from '../../config/endpoints'

export default function EditProducts() {
    const navigation = useNavigate()
    const {id} = useParams()
    const [disable, setDisable] = useState(true)
    const [image, setImage] = useState(null)
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

        if(prodImg){
            const formData = new FormData()
            formData.append('id', id)
            formData.append('name', name)
            formData.append('price', price)
            formData.append('admin', admin)
            formData.append('description', description)
            formData.append('img', prodImg)
            formData.append('oldImage', image)
            const context = {
                method: 'POST',
                headers:{'enctype': 'multipart/form-data'},
                body: formData
            }
            fetch(urls.editProductURL, context)
            .then(response=>response.json())
            .then(response=>{
                if(response.status){
                    toast.success(response.message)
                    setState({name: '', price: 0, description: ''})
                    setProdImg(null)
                    e.target.reset()
                    navigation('/admin/viewproduct')
                }else{
                    toast.error(response.message)
                }
            })
            .catch(error=>{
                toast.error(error.message)
            })
            .finally(()=>setLoading(false))
        }else{
            const bodyData = {id: Number(id), admin, name, price, description, img: image}
            const context = {
                method: 'POST',
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify(bodyData),
            }
            fetch(urls.editProductContentURL, context)
            .then(response=>response.json())
            .then(response=>{
                const {status, message} = response
                if(status){
                    toast.success(message)
                    navigation('/admin/viewproduct')
                }else{
                    toast.error(message)
                }
            })
            .catch(error=>{
                toast.error(error.message)
            })
            .finally(()=>setLoading(false))
        }
    }

    const getSingleProduct = id => {
        const admin = localStorage.getItem('et-admin')
        fetch(`${urls.getSingleProductsURL}/${admin}/${id}`)
        .then(response=>response.json())
        .then(response=>{
            const {status, data} = response
            if(status){
                const {name, price, description, img} = data
                setState({name, price: Number(price), description})
                setImage(img)
            }else{
                toast.error('Failed to fetch product')
            }
        })
        .catch(err=>toast.error(err.message))
    }
    useEffect(()=>{
        getSingleProduct(id)
    }, [])

    const links = [
        {title: 'Admin Dashboard', link: '/admin/'},
        {title: 'Edit Product', link: `/admin/viewproduct/${id}`},
    ]
    const toggleDisable = () => setDisable(false)
  return (
    <>
        <Header title="ET - SHOP | Edit Product" subtitle={links} />
        <br />
        <br />
        <Layout className="width-50 margin-auto">
            <MainLayout 
                title="Edit Product" 
                showBtn={disable} 
                onClick={toggleDisable}
                btnName="Edit"
            >
                <div className="padding-all-20">
                    <form onSubmit={onSubmit}>
                        <div>
                            <label>Product Name</label>
                            <Input disabled={disable} type="text" onChange={onChange} value={state.name} name="name" className="input" />
                        </div>
                        <br />
                        <div>
                            <label>Product Price</label>
                            <Input type="number" disabled={disable} onChange={onChange} min="0" value={state.price} name="price" className="input" />
                        </div>
                        <br />
                        <div>
                            <label>Description</label>
                            <textarea disabled={disable} value={state.description} name="description" onChange={onChange} />
                        </div>
                        <div>
                            <label>Product Image</label>
                            <Input onChange={onFile} disabled={disable} type="file" className="input" />
                        </div>
                        <br />
                        {
                            disable
                            ?
                            <></>
                            :
                            <>
                                <hr />
                                <br />
                                <div className="flex-row-reverse">
                                    <Button name="Update Product" loading={loading} />
                                </div>
                            </>
                        }
                    </form>
                </div>
            </MainLayout>
        </Layout>
        <br />
        <br />
    </>
  )
}
