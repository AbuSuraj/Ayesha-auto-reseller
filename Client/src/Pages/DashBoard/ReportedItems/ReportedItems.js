import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Context/AuthProvider';
import useTitle from '../../../Hooks/useTitle';

const ReportedItems = () => {
  const {loading} = useContext(AuthContext)
    useTitle('Reported Items');
    
    const {
        data: reportedItems = [],
        refetch,
        isLoading,
      } = useQuery({
        queryKey: ["report"],
        queryFn: async () => {
          const res = await fetch("https://ayeshaauto.vercel.app/report");
          const data = await res.json();
          return data;
        },
      });

      const handleDelete = (reportId, itemId) => {
        console.log(reportId,itemId)
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
            fetch(`https://ayeshaauto.vercel.app/report/${itemId}`, {
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
            //   deleting reported item 
              fetch(`https://ayeshaauto.vercel.app/reportedItem/${itemId}`, {
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
          Total Reported Items: {reportedItems?.length}
        </h2>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Product Name</th>
                <th>Seller Name</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {reportedItems?.map((reporteditem, i) => (
                <tr key={reporteditem._id}>
                  <th>{i + 1}</th>
                  <td>{reporteditem.productName}</td>
                  <td>{reporteditem.seller}</td>
                  {/* <td>{ user?.role !== 'admin' && <button onClick={() => handleMakeAdmin(user._id)} className='btn btn-xs btn-primary'>Make Admin</button>}</td> */}
                  <td>
                    <button
                      onClick={() => handleDelete(reporteditem._id, reporteditem.product_id)}
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

export default ReportedItems;