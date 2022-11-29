import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading/Loading";
import { AuthContext } from "../../../Context/AuthProvider";
import useTitle from "../../../Hooks/useTitle";
import useToken from "../../../Hooks/useToken";

const Register = () => {
  useTitle("Sign Up");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, signInWithGoogle,updateUserProfile,setLoading,loading } = useContext(AuthContext);

  const [signUpError, setSignUPError] = useState("");
  const [createdUserEmail, setCreatedUserEmail] = useState("");
  const [token] = useToken(createdUserEmail);
  const navigate = useNavigate();
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'
  if(token){
      navigate('/');
  }

  const handleSignUp = (data) => {
    setSignUPError("");
    console.log(data.password)
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast("User Created Successfully.");
        const userInfo = {
          displayName: data.name,
        };
        updateUserProfile(userInfo)
          .then(() => {
            saveUser(data.name, data.email, data.accountType);
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => {
        console.log(error);
        setSignUPError(error.message);
        setLoading(false);
      });
  };
   // Google Signin
   const handleGoogleSignin = () => {
    signInWithGoogle().then(result => {
      // console.log(result.user);
      const accountType = 'buyer';
      console.log(result.user.displayName,result.user.email, accountType);
      toast.success("User created Successfully with Google!");
      saveUser(result.user.displayName,result.user.email, accountType);
      // navigate(from, { replace: true })
    })
  }
  const saveUser = (name, email, accountType) =>{
    const user ={name, email,accountType};
    fetch('https://ayeshaauto.vercel.app/users', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data =>{
        setCreatedUserEmail(email);
    })
}
  if(loading){
    return  <div className=" my-5 mx-auto w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div> 
}
  return (
    <div className="h-full flex justify-center my-10 ">
      <div className="w-96 p-7 bg-zinc-700 shadow-2xl rounded-2xl">
        <h2 className="text-xl text-center text-white">Sign Up</h2>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text text-white">Name</span>
            </label>
            <input
              type="text"
              {...register("name", {
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
              <span className="label-text text-white">Email</span>
            </label>
            <input
              type="email"
              {...register("email", {
                required: true,
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text text-white">Password</span>
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be 6 characters long",
                },
                pattern: {
                  value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                  message:
                    "Password must have uppercase, number and special characters",
                },
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs ">
          <label className="label">
              {" "}
              <span className="label-text text-white">Account Type</span>
            </label>
            <select className="select select-bordered w-full max-w-xs" {...register("accountType")}>
                <option disabled value="Select account type">Select account type</option>
             
              <option selected value="buyer">buyer</option>
              <option value="seller">seller</option>
            </select>
          </div>
          <input
            className="btn btn-accent w-full mt-4"
            value="Sign Up"
            type="submit"
          />
          {signUpError && <p className="text-red-600">{signUpError}</p>}
        </form>
        <p className="text-white">
          Already have an account{" "}
          <Link className="text-secondary" to="/login">
            Please Sign In
          </Link>
        </p>
        <div className="divider text-white">OR</div>
        <button  onClick={handleGoogleSignin} className="btn btn-outline w-full text-white">
          CONTINUE WITH GOOGLE
        </button>
      </div>
    </div>
  );
};

export default Register;
