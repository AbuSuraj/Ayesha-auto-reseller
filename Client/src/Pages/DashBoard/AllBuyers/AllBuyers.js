import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Context/AuthProvider';
import useTitle from '../../../Hooks/useTitle';

const AllBuyers = () => {
  const {loading} = useContext(AuthContext)
  useTitle('Buyers')
    const {
        data: buyers = [],
        refetch,
        isLoading,
      } = useQuery({
        queryKey: ["buyers"],
        queryFn: async () => {
          const res = await fetch("https://ayeshaauto.vercel.app/buyers",
          {    headers: {
            'content-type': 'application/json',
            authorization: `bearer ${localStorage.getItem('accessToken')}`
        },}
          );
          const data = await res.json();
          return data;
        },
      });
    
      const handleDelete = (id) => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            fetch(`https://ayeshaauto.vercel.app/buyer/${id}`, {
              method: "DELETE",
              headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            })
              .then((res) => res.json())
              .then((data) => {
                /// deletedCount // dont forget this spelling
                if (data?.deletedCount > 0) {
                  refetch();
                }
              });
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          }
        });
      };
    
    
      if (isLoading && loading) {
        return (
          <div className=" my-5 mx-auto w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
        );
      }
      return (
        <div className="mx-4">
          <h2 className="text-3xl my-5 text-center">
            Numbers of Buyers: {buyers?.length}
          </h2>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {buyers?.map((buyer, i) => (
                  <tr key={buyer._id}>
                    <th>{i + 1}</th>
                    <td>{buyer.name}</td>
                    <td>{buyer.email}</td>
                    {/* <td>{ user?.role !== 'admin' && <button onClick={() => handleMakeAdmin(user._id)} className='btn btn-xs btn-primary'>Make Admin</button>}</td> */}
                    <td>
                      <button
                        onClick={() => handleDelete(buyer._id)}
                        className="btn btn-xs btn-error"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    );
};

export default AllBuyers;