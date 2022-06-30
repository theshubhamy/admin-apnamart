import React, { useState } from "react";
const userContext = React.createContext({
  name: "",
  email: "",
  phone: "",
  profileImageUrl: "",
  setEmail: () => {},
  setName: () => {},
  setPhone: () => {},
  userDetails: () => {},
});
const retrieveStoredData = () => {
  const storedName = sessionStorage.getItem("name");
  const storedEmail = sessionStorage.getItem("email");
  const storedPhone = sessionStorage.getItem("phone");
  const storedProfileImageUrl = sessionStorage.getItem("profileImageUrl");

  return {
    name: storedName,
    email: storedEmail,
    phone: storedPhone,
    profileImageUrl: storedProfileImageUrl,
  };
};
export const UserContextProvider = (props) => {
  const storedData = retrieveStoredData();
  var initialName;
  var initialEmail;
  var initialPhone;
  var initialProfileImageUrl;
  if (storedData) {
    initialName = storedData.name;
    initialEmail = storedData.email;
    initialPhone = storedData.phone;

    initialProfileImageUrl = storedData.profileImageUrl;
  }

  const [email, setEmail] = useState(initialEmail);
  const [name, setName] = useState(initialName);
  const [phone, setPhone] = useState(initialPhone);
  const [profileImageUrl, setProfileImageUrl] = useState(
    initialProfileImageUrl
  );
  const userEmailHandler = (email) => {
    setEmail(email);
    sessionStorage.setItem("email", email);
  };
  const userPhoneHandler = (phone) => {
    setPhone(phone);
    sessionStorage.setItem("phone", phone);
  };
  const userNameHandler = (name) => {
    setName(name);
    sessionStorage.setItem("name", name);
  };
  const userDetailsHandler = (name, email, phone, profileImageUrl) => {
    setName(name);
    sessionStorage.setItem("name", name);
    setEmail(email);
    sessionStorage.setItem("email", email);
    setPhone(phone);
    sessionStorage.setItem("phone", phone);
    setProfileImageUrl(profileImageUrl);
    sessionStorage.setItem("profileImageUrl", profileImageUrl);
  };
  const contextValue = {
    name: name,
    email: email,
    phone: phone,
    profileImageUrl: profileImageUrl,
    setEmail: userEmailHandler,
    setName: userNameHandler,
    setPhone: userPhoneHandler,
    userDetails: userDetailsHandler,
  };
  return (
    <userContext.Provider value={contextValue}>
      {props.children}
    </userContext.Provider>
  );
};

export default userContext;
