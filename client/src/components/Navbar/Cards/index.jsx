import { Button, Box , Image } from '@chakra-ui/react'
import moment from "moment"
import React from 'react'
import { Link } from 'react-router-dom'
import { useBasket } from '../../../contexts/BasketContext'

const Cards = ({item}) => {
  const {addToBasket,items}=useBasket();
  const findBasketItem=items.find((basket_item)=>basket_item._id===item._id)
  console.log("object")
  console.log("object2")

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="3">
      <Link to={`/product/${item._id}`}>
        <Image src={item.photos} alt='product' loading='lazy'/>
        <Box p="6">
          <Box d="flex" alignItems="baseline">{moment(item.createdAt).format("DD.MM.YYYY")}</Box>
          <Box mt="1" fontWeight="semibold" as='h4' lineHeight="tight">{item.title}</Box>
          <Box>{item.price} TL</Box>
        </Box>
      </Link>
      <Button colorScheme={findBasketItem ? "red" : "green"} variant="solid" onClick={()=> addToBasket(item,findBasketItem)}>
        {
          findBasketItem ? "Remove from basket" : "Add to basket"
        }
      </Button>
    </Box>
  )
}

export default Cards
