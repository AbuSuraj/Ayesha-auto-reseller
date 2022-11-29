import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../../../../components/Loading/Loading';
import { AuthContext } from '../../../../../Context/AuthProvider';
import Product from './Product/Product';

const Products = () => {
    const {loading} = useContext(AuthContext)
    const {id} = useParams();
    console.log(id);
    const { data: products = [], refetch, isLoading } = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const res = await fetch(`https://ayeshaauto.vercel.app/category/${id}`,
            {     headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },}
            );
            const data = await res.json();
            return data
        }
    });
 
 
    if(loading && isLoading ){
        return  <div className=" my-5 mx-auto w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div> 
    }
     
    return (
        <div>  

         {
               products?.length === 0 ? <><h1 className='text-center font-bold'>No car Available for this category</h1></> 
               : 
               <>
               <div className='grid gap-6 ml-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-10'>
             {
                products?.map(product =><Product
                key={product._id}
                product = {product}
                
                ></Product>)
             }
           </div>
               </>
         }
            {/* {
                products.length ? === 0 "No car Available for this category": <>
                  <div className='grid gap-6 ml-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-10'>
             {
                products.map(product =><Product
                key={product._id}
                product = {product}
                ></Product>)
             }
           </div>
                </>
            }
          */}
        </div>
    );
};

export default Products;