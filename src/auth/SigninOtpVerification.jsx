import React, { useContext } from "react";
import UserContext from "../store/userContext";
import AuthContext from "../store/authContext";
import OtpCard from "../components/card/OtpCard";
import apnaMart from "../api/apnaMart";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const SigninOtpVerification = () => {
  const userContext = useContext(UserContext);
  const authContext = useContext(AuthContext);
  const email = userContext.email;
  let navigate = useNavigate();
  const signinOtpHandler = async (otp) => {
    const enteredOtp = parseInt(otp);
    try {
      const response = await apnaMart.post(
        "/auth/administrator/login/otp-verification",
        {
          email: email,
          otp: enteredOtp,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 201) {
        toast.success(response.data.msg);
        let expirationTime = new Date();
        expirationTime.setDate(expirationTime.getDate() + 1);
        authContext.login(response.data.token, expirationTime.toISOString());
        userContext.userDetails(
          response.data.name,
          response.data.email,
          response.data.phone,
          response.data.profileImageUrl
        );
        navigate("../", { replace: true });
      } else {
        toast.warn(response.data.msg);
        navigate("../auth/signin", { replace: true });
      }
    } catch (error) {
      toast.error(error.message);
      navigate("../auth/signin", { replace: true });
    }
  };
  return (
    <>
      <OtpCard
        email={userContext.email}
        onOtpVerification={signinOtpHandler}
      ></OtpCard>
    </>
  );
};

export default SigninOtpVerification;
