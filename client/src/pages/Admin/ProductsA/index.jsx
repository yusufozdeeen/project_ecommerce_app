import { Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { fetchProductList, deleteProduct } from '../../../api'
import {Popconfirm, Table} from 'antd'
import { Link } from 'react-router-dom'
import { useMemo } from 'react'

const ProductsA = () => {

  const queryClient=useQueryClient()

  const {isLoading, isError, data, error}=useQuery("admin:products",fetchProductList)

  const deleteMutation=useMutation(deleteProduct,{
    onSuccess: (()=> queryClient.invalidateQueries("admin:products")
    )
  })

  const columns= useMemo(()=>{
    return [{
      title:"Title",
      dataIndex:"title",
      key:"title"
    },{
      title:"Price",
      dataIndex:"price",
      key:"price"
    },{
      title:"Created At",
      dataIndex:"createdAt",
      key:"createdAt"
    },{
      title:"Action",
      key:"action",
      render:(text,record) => (
        <>
          <Link to={`/admin/products/${record._id}`} >Edit</Link>
          <Popconfirm 
          title="Are you sure?"
          onConfirm={()=>{
            deleteMutation.mutate(record._id)

          }}
          onCancel={()=>{
          }}
          okText="Yes"
          cancelText="No"
          placement='left'
          >
            <a href="/#" style={{marginLeft:17}}>Delete</a>
          </Popconfirm>
        </>
      ),
    },
  ]
  },[])

  if(isLoading){
    return <div>Loading...</div>
  }

  if(isError){
    return <div>{error.message}</div>
  }

  console.log(data)

  return (
    <div>
     
     <Flex justifyContent="space-between" alignItems="center">
     <Text textAlign="center" bg="blue.300" borderRadius={7} width="100%" fontSize="2xl" mt="7" p={1} mr="1" >
        Products
      </Text>

      <Link to="/admin/products/new">
      <Button bg="blue.300" p={5} pt="6" pb="5" mt={7} >
        Add a new product
      </Button>
      </Link>

     </Flex>

      <Table dataSource={data } columns={columns} rowKey="_id"/>
    </div>
  )
}

export default ProductsA
