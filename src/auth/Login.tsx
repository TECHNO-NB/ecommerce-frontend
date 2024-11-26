import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../redux/UserSlice";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginUser = async () => {
    try {
      setLoader(true);
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/login`,
        {
          email,
          password,
        }
      );

      setEmail("");
      setPassword("");
      setLoader(false);

      if (res.data.success) {
        toast.success("Login successful");
        const user = {
          id: res.data.data.user._id,
          fullName: res.data.data.user.fullName,
          email: res.data.data.user.email,
          role: res.data.data.user.role,
          isLoggedIn: true,
        };
        dispatch(login(user));

   

        if (res.data.data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }

        setTimeout(() => {
          toast.success("Welcome " + res.data.data.user.fullName);
        }, 2000);
      } else {
        toast.error("Login Error");
      }
    } catch (error) {
      setLoader(false);
      console.error("Login error:", error);
      toast.error("Login Error");
    }
  };

  return (
    <div className="flex items-center justify-center h-[100vh] sm:h-[100vh]">
      {loader && <Loader />}
      <div className="bg-[#E0E6EC] w-[30em] h-full flex flex-col px-8 justify-center">
        <h1 className="text-2xl text-start sm:text-3xl">
          <span className="text-[#0086FF] font-bold">Login</span> your account
        </h1>
        <div className="flex flex-col gap-4 mt-4">
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2"
            placeholder="Email"
            type="email"
            value={email}
            required
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2"
            placeholder="Password"
            type="password"
            value={password}
            required
          />
        </div>
        <button
          onClick={loginUser}
          className="bg-[#0086FF] rounded-[50px] mt-4 text-white text-xl w-[100px] h-[39px]"
          disabled={loader}
        >
          Login
        </button>
        <h1 className="mt-4 text-center">
          Not have an account yet?
          <Link className="text-[#0086FF]" to="/register">
            {" "}
            Register
          </Link>
        </h1>
      </div>
    </div>
  );
};

export default Login;
