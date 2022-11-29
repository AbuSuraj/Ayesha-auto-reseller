import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
 
import { AuthContext } from '../../../Context/AuthProvider';
import useTitle from '../../../Hooks/useTitle';

const AddAProduct = () => {
  const imageHostKey = process.env.REACT_APP_imgbb_key
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
      const {user, loading} = useContext(AuthContext)
      useTitle('Add a product')
     const navigate = useNavigate();
      // console.log(user.displayName)
      const date = new Date()
      const [addProductError, setAddProductError] = useState("");
      const [addedProduct, setAddedProduct] = useState("");
      const [categories, setCategories] = useState([])

     const handleAddProduct = (data) =>{
      const image = data.image[0];
      const formData = new FormData();
      formData.append('image',image)
      const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
      fetch(url, {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
        .then(imgData => {
            if(imgData.success){
                console.log(imgData.data.url);
                const product = {
                  productName: data.productName, 
                  originalPrice: data.originalPrice,
                  resalePrice: data.resalePrice,
                  location: data.location,
                  categoryId: data.category,
                  condition: data.condition,
                  mobile: data.mobile,
                  productDescription: data.productDescription,
                  purchaseYear: data.purchaseYear,
                  image: imgData.data.url,
                  createdDate: date,
                  seller: user.displayName,
                  email: user.email,
                  isAdvertised:'false',
                  isPaid:false
                }
                console.log(product);
                // added product into db
                fetch('https://ayeshaauto.vercel.app/addproduct', {
                  method: 'POST',
                  headers: {
                      'content-type': 'application/json',
                      authorization: `bearer ${localStorage.getItem('accessToken')}`
                  },
                  body: JSON.stringify(product)
              })
                  .then(res => res.json())
                  .then(data => {
                      console.log(data)
                      if(data.acknowledged){
                          toast.success('Product added successfully')
                          navigate("/dashboard/myproducts");
                          // form.reset();  
                      }
                  })
                  .catch(er => console.error(er));
              }
            }
              )
                
        setAddProductError("");
     }
    //  fetching categories
useEffect(()=>{
  axios.get('https://ayeshaauto.vercel.app/categories')
  .then((data) =>{
    console.log(data);
    setCategories(data.data);
  })
  .catch((error) => console.log(error))
},[])

if(loading){
  return  <div className=" my-5 mx-auto w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div> 
}
    return (
        <div className=" flex justify-center my-10 ">
        <div className="w-96 p-7 bg-zinc-700 shadow-2xl rounded-2xl">
          <h2 className="text-xl text-center text-white">Add a Product</h2>
          <form onSubmit={handleSubmit(handleAddProduct)}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                {" "}
                <span className="label-text text-white">Product Name</span>
              </label>
              <input
                type="text"
                placeholder='Product Name'
                {...register("productName", {
                  required: "Name is Required",
                })}
                className="input input-bordered w-full max-w-xs"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                {" "}
                <span className="label-text text-white">Original Price</span>
              </label>
              <input
                type="text"
                {...register("originalPrice", {
                  required: true,
                })}
                placeholder="Original Price"
                className="input input-bordered w-full max-w-xs"
              />
              {errors.originalPrice && (
                <p className="text-red-500">{errors.originalPrice.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                {" "}
                <span className="label-text text-white">Resale Price</span>
              </label>
              <input
                type="text"
                placeholder='Resale Price'
                {...register("resalePrice", {
                  required: "Resale price is required",
                })}
                className="input input-bordered w-full max-w-xs"
              />
              {errors.resalePrice && (
                <p className="text-red-500">{errors.resalePrice.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-xs ">
            <label className="label">
                {" "}
                <span className="label-text text-white">Location</span>
              </label>
              <select className="select select-bordered w-full max-w-xs" {...register("location")}>
                  <option selected disabled value="Select your location">Select your location</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Chittagong">Chittagong</option>
                <option value="Khulna">Khulna</option>
                <option value="Barishal">Barishal</option>
                <option value="Rangpur">Rangpur</option>
                <option value="Rajshahi">Rajshahi</option>
                <option value="Sylhet">Sylhet</option>
              </select>
            </div>
            <div className="form-control w-full max-w-xs ">
            <label className="label">
                {" "}
                <span className="label-text text-white">Category</span>
              </label>
              <select className="select select-bordered w-full max-w-xs" {...register("category")}>
              <option selected disabled value="select category">Select category</option>
                {
                  categories.map(category => <option key={category._id}
                    
                  value= {category._id}
                  >{category.categoryName}</option>)
                }
                
                
              </select>
            </div>
            <div className="form-control w-full max-w-xs ">
            <label className="label">
                {" "}
                <span className="label-text text-white">Condition</span>
              </label>
              <select className="select select-bordered w-full max-w-xs" {...register("condition")}>
                  <option disabled selected value="Select your product Condition">Select your product Condition</option>
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                
              </select>
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                {" "}
                <span className="label-text text-white">Mobile Number</span>
              </label>
              <input
                type="text"
                placeholder='Contact Number'
                {...register("mobile", {
                  required: "Mobile number is required",
                })}
                className="input input-bordered w-full max-w-xs"
              />
              {errors.mobile && (
                <p className="text-red-500">{errors.mobile.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                {" "}
                <span className="label-text text-white">Product Description</span>
              </label>
              <textarea
                type="text"
                placeholder='Product Description'
                {...register("productDescription", {
                  required: "Product Description is required",
                })}
                className="textarea textarea-bordered h-24 w-full max-w-xs"
              />
              {errors.productDescription && (
                <p className="text-red-500">{errors.productDescription.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                {" "}
                <span className="label-text text-white">Purchase's Year</span>
              </label>
              <input
                type="text"
                placeholder='Purchase`s year'
                {...register("purchaseYear", {
                  required: "Purchase's Year is required",
                })}
                className="input input-bordered w-full max-w-xs"
              />
              {errors.purchaseYear && (
                <p className="text-red-500">{errors.purchaseYear.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                {" "}
                <span className="label-text text-white">Photo</span>
              </label>
              <input
                type="file"
                placeholder='Purchase`s year'
                {...register("image", {
                  required: "Photo is required",
                })}
                className="file-input w-full max-w-xs"
              />
              {errors.image && (
                <p className="text-red-500">{errors.image.message}</p>
              )}
            </div>
            <input
              className="btn btn-accent w-full mt-4"
              value="Add Product"
              type="submit"
              
            />
            {addProductError && <p className="text-red-600">{addProductError}</p>}
             
          </form>
  
          
        </div>
      </div>
    );
};

export default AddAProduct;