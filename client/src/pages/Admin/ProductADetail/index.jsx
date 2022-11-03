import { Box, Button, FormControl, FormLabel, Input, Text, Textarea } from '@chakra-ui/react';
import { FieldArray, Formik } from 'formik';
import React from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import { fetchProduct, updateProduct } from "../../../api";
import validationSchema from './validations'
import { message } from 'antd';


const ProductADetail = () => {
    
    const {product_id}=useParams();
    const {isLoading,isError,data,error}=useQuery([
        "admin:product",
        product_id], () =>
        fetchProduct(product_id))

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        <div>Error {error.message}</div>
    }

    const handleSubmit= async (values, bag) =>{
        message.loading({content:"Loading...",key:"product_update"})

        try {
            await updateProduct(values, product_id);
            message.success({
                content:"The product successfully updated"
                ,key:"product_update"
                ,duration:2,
            })
        } catch (error) {
            message.error("The product does not updated!")
        }
    }


  return (
    <div>
      <Text fontSize="2xl">Edit</Text>

      <Formik initialValues={{
        title:data.title,
        description:data.description,
        price:data.price,
        photos:data.photos
      }}
      validationSchema={validationSchema}
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
                                                    Update
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

export default ProductADetail
