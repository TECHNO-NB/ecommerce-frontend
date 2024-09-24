// components/UserVerifier.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { login } from "../redux/UserSlice";
import { RootState } from "../redux/store";

const UserVerifier: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/reverifyuser`
        );

        if (res.data.success) {
          const user = {
            id: res.data.data.user._id,
            fullName: res.data.data.user.fullName,
            email: res.data.data.user.email,
            role: res.data.data.user.role,
            isLoggedIn: true,
          };
          dispatch(login(user));

          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (!user.isLoggedIn) {
      verifyUser();
    }
  }, [dispatch, navigate, user.isLoggedIn]);

  return null;
};

export default UserVerifier;
