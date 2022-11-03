
import { Box, Button, FormControl, FormLabel, Input, Text, Textarea } from '@chakra-ui/react';
import { FieldArray, Formik } from 'formik';
import React from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { postProduct } from "../../../api";
import validationSchema from './validations'
import { message } from 'antd';


const NewProduct = () => {
    const queryClient=useQueryClient()
    const newProductMutation=useMutation(postProduct,{
        onSuccess: (()=> queryClient.invalidateQueries("admin:products")
        )
      })
    const handleSubmit= async (values, bag) =>{
        console.log(values)
        message.loading({content:"Loading...",key:"product_update"})

        // values.photos=JSON.stringify(values.photos)

        const newValues={
            ...values,
            photos:JSON.stringify(values.photos)
        }

        newProductMutation.mutate(newValues,{
            onSuccess:()=> {
                message.success({
                    content:"The product successfully updated"
                    ,key:"product_update"
                    ,duration:2,
                })
            }
        
        })


    }


  return (
    <div>
      <Text fontSize="2xl"  mt={7} bg="green.100" borderRadius={7} display="inline-block" p={2} >
        New Product
      </Text>

      <Formik initialValues={{
        title:"",
        description:"",
        price:"",
        photos:[]
      }}
    //   validationSchema={validationSchema}
        onSubmit={handleSubmit}
        >
            {
                ({handleSubmit, errors, touched, handleChange, handleBlur, values, isSubmitting}) => 
                <>
                <Box>
                    <Box my="5" textAlign="left">
                        <form onSubmit={handleSubmit}>
                            <FormControl>
                                <FormLabel>Title</FormLabel>
                                <Input 
                                    name='title'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.title}
                                    disabled={isSubmitting}
                                    isInvalid={touched.title && errors.title}
                                />
                            </FormControl>
                            <FormControl mt="7">
                                <FormLabel>Description</FormLabel>
                                <Textarea 
                                    name='description'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.description}
                                    disabled={isSubmitting}
                                    isInvalid={touched.description && errors.description}
                                />
                            </FormControl>
                            <FormControl mt="7">
                                <FormLabel>Price</FormLabel>
                                <Input 
                                    name='price'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.price}
                                    disabled={isSubmitting}
                                    isInvalid={touched.price && errors.price}
                                />
                            </FormControl>
                            <FormControl mt="7">
                                <FormLabel>Photos</FormLabel>
                                <FieldArray 
                                    name='photos'
                                    render={(arrayHelpers)=>(
                                        <div>
                                            {
                                                values.photos && values.photos.map((photo, index)=>(
                                                    <div key={index}>
                                                        <Input
                                                        name={`photos.${index}`}
                                                        value={photo}
                                                        disabled={isSubmitting}
                                                        onChange={handleChange}
                                                        width="3xl"
                                                        />
                                                        <Button 
                                                        ml="3" 
                                                        type='button' 
                                                        colorScheme="green"
                                                        onClick={()=> arrayHelpers.remove(index)}
                                                        >Remove</Button>
                                                    </div>
                                                ))}
                                                <Button mt="7" onClick={()=>arrayHelpers.push("")}>
                                                    Add a photo
                                                </Button>

                                        </div>
                                    )}
                                />
                            </FormControl>

                            <Button mt="7" width="full" type='submit' isLoading={isSubmitting}>
                                                    Save
                            </Button>
                        </form>
                    </Box>
                </Box>
                </>
            }

      </Formik>
    </div>
  )
}

export default NewProduct
