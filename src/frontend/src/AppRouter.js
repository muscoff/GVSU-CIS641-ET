import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import UserDash from './components/UserDash'
import UserLogin from './pages/userLogin/Index'
import AdminLogin from './pages/adminLogin/Index'
import SideLayout from './components/SideLayout'
import UserSideLayout from './components/UserSideLayout'
import { adminSideContent, userSideContent } from './config/sideContent'
import AddProducts from './pages/products/AddProducts'
import ViewProducts from './pages/products/ViewProducts'
import Shop from './pages/shop/Shop'
import EditProducts from './pages/products/EditProduct'
import UserCart from './pages/userCart/UserCart'
import Orders from './pages/orders/Orders'
import AdminOrders from './pages/adminOrders/AdminOrders'

export default function AppRouter() {
    const router = createBrowserRouter([
      {
        path: '/', 
        element: <UserDash />,
        children: [
          {path: '/products', element: <div>Products</div>},
          {path: '/products/:productId', element: <div>Product details</div>}
        ]
      },
      {path: '/user-login', element: <UserLogin />},
      {
        path: '/user/', 
        element: <UserSideLayout sideContent={userSideContent} />,
        children:[
          {path: '/user/shop', element: <Shop />},
          {path: '/user/cart', element: <UserCart />},
          {path: '/user/orders', element: <Orders />},
          {path: '/user/settings', element: <div>Settings</div>},
        ]
      },
      {path: '/admin-login', element: <AdminLogin />},
      {
        path: '/admin/', 
        element: <SideLayout sideContent={adminSideContent} />,
        children: [
          {path: '/admin/addproduct', element: <AddProducts />},
          {path: '/admin/viewproduct', element: <ViewProducts />},
          {path: '/admin/viewproduct/:id', element: <EditProducts />},
          {path: '/admin/orders', element: <AdminOrders />},
        ]
      },
      // {
      //   path: '/admin', 
      //   element: <AdminLogin />,
      //   children: [
      //     {path: '/admin/dash', element: <div>Admin Dashboard</div>},
      //     {path: '/admin/add-product', element: <div>Add Product</div>}
      //   ]
      // },
      // {path: '*', element: <div>Not Found</div>}
    ])

  return (
    <RouterProvider router={router} />
  )
}
