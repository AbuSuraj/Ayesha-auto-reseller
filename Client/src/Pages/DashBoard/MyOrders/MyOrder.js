import React from 'react';
import { Link } from 'react-router-dom';
import useTitle from '../../../Hooks/useTitle';

const MyOrder = ({myorder}) => {
  useTitle('My Orders')
  console.log(myorder)
    const {_id,productName, resalePrice, image} = myorder;
    return (
<div className="card w-96 bg-base-100 shadow-xl">
  <figure><img className='w-full h-[300px]' src= {image} alt="car" /></figure>
  <div className="card-body">
    <h2 className="card-title">{productName}</h2>
    <p>Price: $<span>{resalePrice}</span></p>
    <div className="card-actions justify-end">
     {
       myorder.paid ? <button className='btn btn-primary'>Paid</button> :
        <Link to={`/dashboard/payment/${_id}`} className="btn btn-primary">Pay</Link>
    } 
      
    </div>
  </div>
</div>
    );
};

export default MyOrder;