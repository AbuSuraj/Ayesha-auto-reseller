import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Loading from '../../../components/Loading/Loading';
import { AuthContext } from '../../../Context/AuthProvider';
import useTitle from '../../../Hooks/useTitle';

const AddCategory = () => {
    const imageHostKey = process.env.REACT_APP_imgbb_key
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
      useTitle('Add a category')
 const {loading} = useContext(AuthContext)
      const [addProductError, setAddProductError] = useState("");
      const [addedProduct, setAddedProduct] = useState("");
     const handleAddCategory = (data) =>{
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
                const category = {
                  categoryName: data.categoryName, 
                  
                    image: imgData.data.url
                }
                console.log(category);
                fetch('https://ayeshaauto.vercel.app/addcategory', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(category)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        if(data.acknowledged){
                            toast.success('Service added successfully')
                            // form.reset();  
                        }
                    })
                    .catch(er => console.error(er));
                  console.log(category)
              }
            }
              )
                
        setAddProductError("");
     }
     if(loading){
      return  <div className=" my-5 mx-auto w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div> 
  }
     
    return (
        <div className=" flex justify-center my-10 ">
        <div className="w-96 p-7 bg-zinc-700 shadow-2xl rounded-2xl">
          <h2 className="text-xl text-center text-white">Add a Category</h2>
          <form onSubmit={handleSubmit(handleAddCategory)}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                {" "}
                <span className="label-text text-white">Category Name</span>
              </label>
              <input
                type="text"
                placeholder='Category Name'
                {...register("categoryName", {
                  required: "Category Name is Required",
                })}
                className="input input-bordered w-full max-w-xs"
              />
              {errors.categoryName && (
                <p className="text-red-500">{errors.categoryName.message}</p>
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
              value="Add Category"
              type="submit"
            />
            {addProductError && <p className="text-red-600">{addProductError}</p>}
          </form>
  
          
        </div>
      </div>
    );
};

export default AddCategory;