import { Box} from '@chakra-ui/react'
import React from 'react'
import { Link, Routes, Route, useLocation, useParams, Outlet } from 'react-router-dom'
import Home from './Home'
import ProductsA from './ProductsA'
import Orders from './Orders'

const Admin = () => {
     //const {path,url}=useParams()
    const {path,url}=useLocation()

  return (
    <div>
      <nav>
        <ul className='admin-menu' style={{display:'flex', padding:0, margin:0 }}>
            <li style={{padding:10}}>
                <Link to="/admin"><Box bg="blue.100" p="1" borderRadius={7} >Home</Box></Link>
            </li>
            <li style={{padding:10}}>
                <Link to="/admin/products"><Box bg="blue.300" p="1" borderRadius={7}>Products</Box></Link>
            </li>
            <li style={{padding:10}}>
                <Link to="/admin/orders"><Box bg="blue.500" p="1" borderRadius={7}>Orders</Box></Link>
            </li>
        </ul>
      </nav>
{/* 
        <Box mt="10">
            <Routes>
                <Route exact path={path} element={<Home/>} />
                <Route path={`${path}/products`} element={<ProductsA/>} />
                <Route path={`${path}/orders`} element={<Orders/>} />
            </Routes>
            
        </Box> */}
  <Outlet/>
    </div>
  )
}

export default Admin
