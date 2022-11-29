import { format } from 'date-fns';
import React, { useContext, useState } from 'react';
import BookingModal from './BookingModal/BookingModal';
import { FaCheck, FaRegCheckCircle } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import useTitle from '../../../../../../Hooks/useTitle';
import { AuthContext } from '../../../../../../Context/AuthProvider';
 
const Product = ({product}) => {
  const {_id,productName,condition,originalPrice,resalePrice,location,mobile,productDescription,purchaseYear,createdDate,image, seller, email} = product;
  const [book,setBook] = useState(null);
 const date = new Date();
 const year = date.getFullYear();
  const pYear = parseInt(purchaseYear)
  const usedYear = year - pYear;
 console.log(email);
 const {loading} = useContext(AuthContext)
 useTitle('category wise car')
 const {
   data: sellers = [],
   refetch,
   isLoading,
 } = useQuery({
   queryKey: ["sellers"],
   queryFn: async () => {
     const res = await fetch("https://ayeshaauto.vercel.app/sellers",
     {    headers: {
      'content-type': 'application/json',
      authorization: `bearer ${localStorage.getItem('accessToken')}`
  },});
     const data = await res.json();
     return data;
   },
 });

 if(isLoading && loading){
  return  <div className=" my-5 mx-auto w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div> 
}
 const handleReport = (product) =>{
console.log(product);

const reportedItem = {product_id:_id,productName,condition,originalPrice,resalePrice,location,mobile,productDescription,purchaseYear,createdDate,image, seller, email}
fetch('https://ayeshaauto.vercel.app/report', {
   method: 'POST',
   headers: {
       'content-type': 'application/json',
       authorization: `bearer ${localStorage.getItem('accessToken')}`
   },
   body: JSON.stringify(reportedItem)
})
.then(res => res.json())
.then(data => {
    console.log(data)
    if(data.acknowledged){
        toast.success('Report sent to admin')
       
        // form.reset();  
    }
})
.catch(er => console.error(er));
 }

 if(isLoading){
   return  <div className=" my-5 mx-auto w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div> 
}
    return (
<div className="card w-96 bg-base-100 shadow-xl">
  <figure><img className='w-full h-[250px]' src={image} alt="car" /></figure>
  <div className="card-body">
    <h2 className="card-title">{productName}
    <div className="badge badge-secondary">{condition}</div>
    </h2>
     <div className='h-[300px]'>
        <p>Original Price: <span className='font-bold'>${originalPrice}</span></p>
        <p>Resale Price: <span className='font-bold'>${resalePrice}</span></p>
   
        <p>Location: <span className='font-bold'>{location}</span></p>
        <p>Contact Number: <span className='font-bold'>{mobile}</span></p>
        <p><span className='font-bold'>Years of used:</span> {usedYear} years</p>
        <p><span className='font-bold'>Overview:</span> {productDescription.length>20?  productDescription.slice(0,100)+'...': productDescription}</p>
        <p><span className='font-bold'>Posted Date:</span> {createdDate.slice(0,10)}</p>
        <p className='flex items-center '><span><span className='font-bold'> Seller Name: </span> 
        {seller}</span>
        <span className='text-green-600 ml-2 text-2xl'>
         {sellers?.map(sllr =><span key={sllr._id}
         >
          {console.log(sllr)} {(sllr.email ===email && sllr.verify) ? <FaRegCheckCircle></FaRegCheckCircle>: ''} 
         </span>
         )
         }
        </span>
        </p>
     </div>
    <div className="card-actions justify-end ">
       <label 
       onClick={() =>setBook(product)}
       htmlFor="booking-modal" className="btn">Book Now</label> 
       <button onClick={()=>handleReport(product)} className="btn btn-warning">Report this item</button>
      </div>
     {
     book &&
     <BookingModal 
     key={_id}
     product = {product}
     setBook = {setBook}
     ></BookingModal>
     }
  </div>
</div>
    );
};

export default Product;