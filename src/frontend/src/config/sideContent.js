import { 
    FiShoppingCart, FiPlus, FiEye, FiSettings, FiHome, FiTruck  
} from 'react-icons/fi'

export const adminSideContent = [
    {
        link: '/admin/addproduct',
        icon: <FiPlus />,
        name: 'Add Products'
    },
    {
        link: '/admin/viewproduct',
        icon: <FiEye />,
        name: 'View Products'
    },
    {
        link: '/admin/orders',
        icon: <FiTruck />,
        name: 'Orders'
    }
]

export const userSideContent = [
    {
        link: '/user/shop',
        icon: <FiHome />,
        name: 'Shop'
    },
    {
        link: '/user/cart',
        icon: <FiShoppingCart />,
        name: 'Cart'
    },
    {
        link: '/user/orders',
        icon: <FiTruck />,
        name: 'My Orders'
    },
    // {
    //     link: '/user/settings',
    //     icon: <FiSettings />,
    //     name: 'Settings'
    // }
]