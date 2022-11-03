import { useRadio } from '@chakra-ui/react'
import React from 'react'
import { Navigate, Outlet, Route } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const ProtectedRoute = ({element:Element, admin,...rest}) => {
  const {loggedIn,user}=useAuth()
  if(admin && user.role !=="admin"){
    return <Navigate to={{pathname:"/"}} />
  }
  // return <Route {...rest} render={(props)=> {
  //   if (loggedIn){
  //     console.log("login")
  //     return <Element {...props} />
  //   }
  //   console.log("homepage")
  //   return <Navigate to="/" replace={true} />
  // } }/>

  return loggedIn ? <Outlet /> : <Navigate to="/" />
}

export default ProtectedRoute
