import React, { useEffect } from 'react'

export default function UserAuth({ children }) {
    useEffect(()=>{
        const user = localStorage.getItem('et-user')
        console.log(user)
    })
  return (
    <>{children}</>
  )
}
