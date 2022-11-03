import React from "react";
import {Box, Button, Flex, Grid} from '@chakra-ui/react'
import { useInfiniteQuery } from 'react-query'
import { fetchProductList } from '../../api'
import Cards from '../../components/Navbar/Cards'


const Products = () => {
    const { 
      data,
      error,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      status, } 
      = useInfiniteQuery('products', fetchProductList,{
      getNextPageParam: (lastPage, pages) => {
        const morePagesExist=lastPage?.length===12;
        if (!morePagesExist) {
          return;
        }
        return pages.length+1;
      }
    }
    )
  

  if (status==="loading") return 'Loading...'

  if (status==="error") return 'An error has occurred: ' + error.message

  console.log("data",data);

  return (
    <div>

        <Grid templateColumns='repeat(3, 2fr)' gap={4}>
        {/* {
            data.map((item,i)=>(<Cards key={i} item={item}/>))
        }    */}

        {
          data.pages.map((group,i)=>(
            <React.Fragment key={i}>
              {
                group.map((item)=>(
                  <Box w="100%" key={item._id}>
                    <Cards item={item}/>
                  </Box>
                ))
              }
            </React.Fragment>
          ))
        }
        </Grid>

        <Flex mt="10" justifyContent="center">
        <Button
          onClick={() => fetchNextPage()}
          isLoading={isFetchingNextPage}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
            ? 'Load More'
            : 'Nothing more to load'}
        </Button>
      </Flex>
      
    </div>
  )
}

export default Products
