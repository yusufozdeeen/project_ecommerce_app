import { Alert, Box, Button, Image, Text, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl, 
  FormLabel,
  Textarea,} from '@chakra-ui/react';

import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { postOrder } from '../../api';
import { useBasket } from '../../contexts/BasketContext'

const Basket = () => {
    const [address,setAddress]=useState("")
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = useRef(null)

    const {items,removeFromBasket,emptyBasket}=useBasket();

    const total=items.reduce((acc,obj)=>acc+obj.price,0)

    const handleSubmitForm= async ()=>{
      const itemIds= items.map((item) => item._id)
      
      const input={
        address,
        items: JSON.stringify(itemIds)
      }
      const response= await postOrder(input)
      console.log(response)
      emptyBasket()
      onClose()
    }

  return (
    <Box p="5" >
      {items.length < 1 && <Alert status='warning'>You have not any items in your basket!</Alert>}

      {items.length > 0 && (

      <>
        <ul style={{listStyleType:"decimal"}}>
            {items.map((item)=>(<li key={item._id} style={{marginBottom:17}}>
                <Link to={`/product/${item._id}`}>
                  <Text fontSize="23" > {item.title} - {item.price} TL </Text>  
                    <Image htmlWidth={200} src={item.photos[0]} alt="basket item"/>
                </Link>
                <Button mt="3" size="sm" colorScheme="red" onClick={()=> removeFromBasket(item._id)}>
                    Remove from basket
                </Button>
            </li>) )}
        </ul>
        <Box mt="7">Total:{total}</Box>

        <Button mt="3" size="md" colorScheme="green" onClick={onOpen}>Order</Button>

        <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Order</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Adress</FormLabel>
              <Textarea ref={initialRef} placeholder='Your Adress' value={address} onChange={(e)=> setAddress(e.target.value)} />
            </FormControl>

          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleSubmitForm} >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
        
        </>
      )}

    </Box>
  )
}

export default Basket
