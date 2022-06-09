import React, { useContext } from "react";
import UserContext from "../store/userContext";
//import AuthContext from "../store/authContext";
import OtpCard from "../components/card/OtpCard";
import apnaMart from "../api/apnaMart";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const SignupOtpVerification = () => {
  const userContext = useContext(UserContext);
  //   const authContext = useContext(AuthContext);
  const email = userContext.email;
  let navigate = useNavigate();
  const signupOtpHandler = async (otp) => {
    const enteredOtp = parseInt(otp);
    try {
      const response = await apnaMart.post(
        "/auth/administrator/signup/otp-verification",
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
        console.log(response);
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
        onOtpVerification={signupOtpHandler}
      ></OtpCard>
    </>
  );
};

export default SignupOtpVerification;
