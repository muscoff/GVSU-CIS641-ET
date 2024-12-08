import React, {createContext, useState} from 'react'

export const MyContext = createContext({
  cart: [],
  updateCart: obj => {}
})

export default function MyProvider({children}) {
  const [cart, setCart] = useState([])
  const updateCart = obj => {
    setCart([...cart, obj])
  }
  return (
    <MyContext.Provider value={{
      cart,
      updateCart
    }}>
      {children}
    </MyContext.Provider>
  )
}
