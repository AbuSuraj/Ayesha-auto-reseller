import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthProvider';
import MyOrder from './MyOrder';


const MyOrders = () => {
    const { user,loading } = useContext(AuthContext);
    const email = user?.email;
    console.log(email);
    const {
      data: myOrders = [],
      refetch,
      isLoading,
    } = useQuery({
      queryKey: ["myorders"],
      queryFn: async () => {
        const res = await fetch(
          `https://ayeshaauto.vercel.app/myorders/buyer/${email}`,
          {
            headers: {
              'content-type': 'application/json',
              authorization: `bearer ${localStorage.getItem('accessToken')}`
          },
          }
        );
        const data = await res.json();
        return data;
      },
    });

    console.log(myOrders)

    if (isLoading && loading) {
      return (
        <div className=" my-5 mx-auto w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
      );
    }
    return (
        <div  className='grid gap-6 ml-4 grid-cols-1 md:grid-cols-2  my-10'>
            {
                myOrders.map(myorder => <MyOrder
                key={myorder._id}
                myorder = {myorder}
                ></MyOrder>)
            }
        </div>
    );
};

export default MyOrders;