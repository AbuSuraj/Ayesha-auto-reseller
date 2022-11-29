import React from 'react';
import { Link } from 'react-router-dom';

const Category = ({category}) => {
    const {_id,categoryName, image} = category;
    return (
<div className="card w-96 bg-base-100 shadow-xl">
  <figure><img className='w-full h-[250px]' src={image} alt="category" /></figure>
  <div className="card-body">
    <h2 className="card-title">{categoryName}</h2>
    <div className="card-actions justify-end">
  <Link to={`/category/${_id}`}>  
  <button className="btn btn-primary">See all cars</button></Link>
    </div>
  </div>
</div>
    );
};

export default Category;