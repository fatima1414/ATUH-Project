import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const res = await axios.get("http://localhost:5000/users");
    const user = res.data.find(
      (u) => u.email === data.email && u.password === data.password
    );
    if (user) {
      alert("Login Successful!");
      localStorage.setItem("userId", user.id);
      navigate("/");
    } else {
      alert("Invalid Credentials!");
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="col-lg-6 mx-auto my-5 p-4 shadow">
      <h3 className="text-center">Sign In</h3>
      <input {...register("email")} className="form-control mt-3" placeholder="Email" />
      <input {...register("password")} className="form-control mt-3" placeholder="Password" type="password" />
      <button className="btn btn-primary mt-4 w-100">Login</button>
    </form>
  );
};

export default SignIn;
