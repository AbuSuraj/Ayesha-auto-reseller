import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import useAdmin from "../Hooks/useAdmin";
import useBuyer from "../Hooks/useBuyer";
import useSeller from "../Hooks/useSeller";
import useTitle from "../Hooks/useTitle";
import Footer from "../Pages/SharedPages/Footer/Footer";
import Header from "../Pages/SharedPages/Header/Header";
const DashBoardLayout = () => {
  useTitle("DashBoard");
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  const [isSeller] = useSeller(user?.email);
  const [isBuyer] = useBuyer(user?.email);
  return (
    <div>
      <Header></Header>
      <div className="drawer drawer-mobile">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 text-base-content bg-slate-100 shadow-2xl">
            {isBuyer && (
              <>
                <li className="my-1">
                  <Link to="/dashboard/myorders">My Orders</Link>
                </li>
              </>
            )}
            {isSeller && (
              <>
                <li className="my-1">
                  <Link to="/dashboard/myproducts">My Products</Link>
                </li>
                <li className="my-1">
                  <Link to="/dashboard/addproduct">Add a product</Link>
                </li>
              </>
            )}

            {isAdmin && (
              <>
                <li className="my-1">
                  <Link to="/dashboard/allsellers">All Sellers</Link>
                </li>
                <li className="my-1">
                  <Link to="/dashboard/allbuyers">All Buyers</Link>
                </li>
                <li className="my-1">
                  <Link to="/dashboard/reporteditem">Reported Item</Link>
                </li>
                <li className="my-1">
                  <Link to="/dashboard/addcategory">Add a category</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      {/* <Footer></Footer> */}
    </div>
  );
};

export default DashBoardLayout;
