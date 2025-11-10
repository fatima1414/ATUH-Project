import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const res = await axios.post("http://localhost:5000/users", data);
    alert("User Registered Successfully!");
    reset();
    navigate("/signin");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="col-lg-6 mx-auto my-5 p-4 shadow">
      <h3 className="text-center">Sign Up</h3>
      <input {...register("email")} className="form-control mt-3" placeholder="Email" />
      <input {...register("password")} className="form-control mt-3" placeholder="Password" type="password" />
      <button className="btn btn-success mt-4 w-100">Register</button>
    </form>
  );
};

export default Signup;
