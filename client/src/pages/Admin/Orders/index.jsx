import { useQuery } from 'react-query'
import React from 'react'
import { fetchOrder } from '../../../api'
import { Table, Text, TableCaption, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react'

const Orders = () => {
  const {isLoading,isError,data, error}=useQuery("admin:orders", fetchOrder)
  if(isLoading){
    return <div>Loading...</div>
  }
  
  if(isError){
    return <div>Error {error.message}</div>
  }

  return (
    <div>
      <Text textAlign="center" fontSize="2xl" borderRadius={7} bg="blue.500" mt="7" p={1}>Orders</Text>

      <Table variant="simple">
      {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
      <Thead>
        <Tr>
          <Th>User</Th>
          <Th>Adress</Th>
          <Th>Item</Th>
        </Tr>
      </Thead>
      <Tbody>
        {
          data.map((item)=> (
            <Tr key={item._id}>
              <Td>{item.user.email}</Td>
              <Td>{item.adress}</Td>
              <Td>{item.items.length}</Td>
            </Tr>
          ))
        }
      </Tbody>

      </Table>
    </div>
  )
}

export default Orders
