import axios from "axios";
import React, { useState } from "react";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { login } from "../redux/UserSlice";

const Register: React.FC = () => {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loader, setLoader] = useState<Boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const registerUser = async () => {
    try {
      setLoader(true);
      const res = await axios.post(
        "https://ecommerce-backend-r13r.onrender.com/api/v1/users/register",
        {
          fullName,
          email,
          password,
        }
      );
      setEmail("");
      setFullName("");
      setPassword("");
      setLoader(false);

      console.log(res.data);
      if (res.data.success) {
        toast.success("success");
        navigate("/login");
      } else {
        toast.error("Register Error");
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
      setEmail("");
      setFullName("");
      setPassword("");
      toast.error("Register Error");
    }
  };

  const loginWithGoogle = async (detail: any) => {
    try {
      setLoader(true);
      const res = await axios.post(
        "https://ecommerce-backend-r13r.onrender.com/api/v1/users/googlelogin",
        {
          fullName: detail.name,
          email: detail.email,
          password: detail.jti,
        },
        {
          withCredentials: true,
        }
      );

      setLoader(false);
      console.log(res.data);
      if (res.data.success) {
        toast.success("Login successful");
        setTimeout(() => {
          toast.success("Welcome " + res.data.data.user.fullName);
        }, 2000);

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
        } else if(res.data.data.user.role === "admin") {
          navigate("/");
        }else{
          navigate("/");
        }
       
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
      toast.error("Login Failed");
    }

  };

  return (
    <div className="flex items-center justify-center h-[100vh]">
      {loader ? <Loader /> : null}
      <div className="bg-[#E0E6EC] w-[30em] h-full flex flex-col px-8 justify-center ">
        <h1 className="text-3xl  text-start sm:text-4xl">
          welcome to <span className="text-[#0086FF] font-bold">Scatch</span>
        </h1>
        <h6 className="text-start text-xl">create your account</h6>
        <div className="flex flex-col gap-4">
          <input
            onChange={(e) => setFullName(e.target.value)}
            className="px-4 py-2 mt-6"
            placeholder="FullName"
            type="text"
            value={fullName}
            required
          />
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
          onClick={registerUser}
          className="bg-[#0086FF] rounded-[50px] mt-4 text-white text-xl w-[200px] h-[39px]"
        >
          Create My Account
        </button>
        <div className=" self-center  rounded-[5px] mt-4 text-white ">
          <GoogleLogin
            onSuccess={(credentialResponse: any) => {
              // console.log(credentialResponse);
              const jwtDetail = jwtDecode(credentialResponse.credential);

              loginWithGoogle(jwtDetail);
            }}
            onError={() => {
              toast.error("Login Failed");
            }}
          />
        </div>
        <h1 className="mt-4 text-center">
          Already have a account?
          <Link className="text-[#0086FF]" to="/login">
            {" "}
            Login
          </Link>
        </h1>
      </div>
    </div>
  );
};

export default Register;
