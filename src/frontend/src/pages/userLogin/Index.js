import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Input'
import Button from '../../components/Button'
import toast from 'react-hot-toast'

import { urls } from '../../config/endpoints'

export default function Index() {
    const navigation = useNavigate()
    const [userLogin, setUserLogin] = useState([])
    const [loading, setLoading] = useState(false)
    const [reg, setReg] = useState(false)
    const [state, setState] = useState({email: '', password: '', fullname: '', phone: ''})
    const firstStatement = reg ? "Already have an account?" : "Don't have an account?"
    const secondStatement = reg? "Login" : "Sign Up"

    useEffect(()=>{
        const user = localStorage.getItem('et-user')
        if(user) {
            window.location.href = `/user`
        }
    })

    const altReg = () => setReg(!reg)

    const onChange = e => setState({...state, [e.target.name]: e.target.value})

    const onSubmit = e => {
        e.preventDefault()
        setLoading(true)
        const { email, password, fullname, phone } = state
        if(reg){
            if(!(email && password && fullname && phone)){
                toast.error("All the fileds are required")
                setLoading(false)
                return
            }
            const context = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(state),
            }
            fetch(urls.userCreateLoginURL, context)
            .then(response => response.json())
            .then(response => {
                if(response.status){
                    toast.success(response.message)
                    setState({...state, ['fullname']: '', ['phone']: ''})
                    setLoading(false)
                    setReg(false)
                }else{
                    setLoading(false)
                    toast.error(response.message)
                }
            })
            .catch(error => {
                toast.error("Failed to login")
                setLoading(false)
            })
        }else{
            if(!(email && password)){
                toast.error("All the fileds are required")
                setLoading(false)
                return
            }
            const context = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: email, password }),
            }
            fetch(urls.userLoginURL, context)
            .then(response => response.json())
            .then(response => {
                if(response.status){
                    const {username, details} = response
                    toast.success('Login verified')
                    localStorage.setItem('et-user', username)
                    localStorage.setItem('et-user-details', JSON.stringify(details))
                    setLoading(false)
                    navigation('/user')
                }else{
                    setLoading(false)
                    toast.error(response.message)
                }
            })
            .catch(error => {
                toast.error("Failed to login")
                setLoading(false)
            })
        }
    }
  return (
    <div className="width-100 height-100 off-white-bg flex-column justify-content-center align-items-center">
        <div className="width-30 width-lx-40 width-l-55 width-m-80 width-s-90 login-form-card padding-all-10">
            <div className="bold-text font-20 center-text">{reg ? "User - Sign Up": "User - Sign In"}</div>
            <br />
            <form onSubmit={onSubmit}>
                {
                    reg && (
                        <div>
                            <label>Full Name</label>
                            <Input type="text" name="fullname" value={state.fullname} onChange={onChange} />
                            <br />
                            <br />
                            <label>Contact Number</label>
                            <Input type="text" name="phone" value={state.phone} onChange={onChange} />
                            <br />
                            <br />
                        </div>
                    )
                }
                <label>Email</label>
                <Input type="email" name="email" value={state.email} onChange={onChange} />
                <br />
                <br />
                <label>Password</label>
                <Input type="password" name="password" value={state.password} onChange={onChange} />
                <br />
                <div className="font-14">
                    {firstStatement} <span onClick={()=>altReg()} className="red-hover cursor-pointer">{secondStatement}</span>
                </div>
                <br />
                <Button name={reg ? "Sign Up" : "Sign In"} className="width-100" loading={loading} />
            </form>
        </div>
    </div>
  )
}
