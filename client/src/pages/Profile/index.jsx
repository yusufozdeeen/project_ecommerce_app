import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Button, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';


const Profile = (  ) => {
    const navigate = useNavigate()
    const {user, logout} = useAuth();
    const handleLogout=async ()=>{
        logout(()=>{
            navigate("/")
        });
    }

  return (

    <div>
      <Text fontSize="27">Profile</Text>  
      <code>
        {JSON.stringify(user)}
      </code>
      <br /><br />
      <Button colorScheme="red" variant="solid" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  )
}

export default Profile
