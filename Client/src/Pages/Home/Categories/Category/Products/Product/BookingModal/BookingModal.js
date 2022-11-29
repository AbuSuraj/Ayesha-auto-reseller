import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../../../../../Context/AuthProvider";

const BookingModal = ({product, setBook}) => {
    const {_id,productName,condition,originalPrice,resalePrice,location,mobile,productDescription,purchaseYear,createdDate,image, seller} = product;
    const {user,loading} = useContext(AuthContext);
    
    const name = user?.displayName;
    const email = user?.email;
    console.log(name,email)
    const handleBooking = event => {
        event.preventDefault();
        const form = event.target;
    
        const productName = form.productName.value;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const meetingLocation = form.meetingLocation.value;
        // [3, 4, 5].map((value, i) => console.log(value))
        const booking = {
            productName,
            name,
            email,
            phone,
            meetingLocation, image,resalePrice, product_id:_id
        }
        setBook(booking)
console.log(booking)
        // TODO: send data to the server
        // and once data is saved then close the modal 
        // and display success toast
        fetch('https://ayeshaauto.vercel.app/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    // setTreatment(null);
                    setBook(null)
                    toast.success('Booking confirmed');
                    // refetch();
                }
                else{
                    toast.error(data.message);
                }
            })


    }
    if(loading){
        return  <div className=" my-5 mx-auto w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div> 
    }
  return (
    <>
    <input type="checkbox" id="booking-modal" className="modal-toggle" />
    <div className="modal">
        <div className="modal-box relative">
            <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
            <h3 className="text-lg font-bold">Booked Your Car</h3>
            <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 mt-10'>
                {/* <input type="text" disabled value={date} className="input w-full input-bordered " /> */}
            <div className="form-control w-full  ">
            <label className="label">
              {" "}
              <span className="label-text">Product Name</span>
            </label>
            <input name="productName" type="text" defaultValue={ productName} disabled placeholder="Your Name" className="input w-full input-bordered" />
          </div>
            <div className="form-control w-full  ">
            <label className="label">
              {" "}
              <span className="label-text">Name</span>
            </label>
            <input name="name" type="text" defaultValue={user?.displayName} disabled placeholder="Your Name" className="input w-full input-bordered" />
          </div>
            <div className="form-control w-full  ">
            <label className="label">
              {" "}
              <span className="label-text">Email</span>
            </label>
            <input name="email" type="email" defaultValue={user?.email} disabled placeholder="Email Address" className="input w-full input-bordered" />
          </div>
            <div className="form-control flex w-full  ">
            <label className="label">
              {" "}
              <span className="label-text">Price</span>
            </label>
            <input name="resalePrice" defaultValue={resalePrice} disabled  type="text" placeholder="Price" className="input w-full input-bordered" />
          </div>
            <div className="form-control flex w-full  ">
            <label className="label">
              {" "}
              <span className="label-text">Phone Number</span>
            </label>
            <input name="phone" type="text" placeholder="Phone Number" className="input w-full input-bordered" />
          </div>
            <div className="form-control flex w-full  ">
            <label className="label">
              {" "}
              <span className="label-text">Meeting Location</span>
            </label>
            <input name="meetingLocation" type="text" placeholder="Meeting Location" className="input w-full input-bordered" />
          </div>

                <br />
                <input className='btn btn-accent w-full  ' type="submit" value="Submit" />
            </form>
        </div>
    </div>
</>
  );
};

export default BookingModal;
