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
  const storedName = localStorage.getItem("name");
  const storedEmail = localStorage.getItem("email");
  const storedPhone = localStorage.getItem("phone");
  const storedProfileImageUrl = localStorage.getItem("profileImageUrl");

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
    localStorage.setItem("email", email);
  };
  const userPhoneHandler = (phone) => {
    setPhone(phone);
    localStorage.setItem("phone", phone);
  };
  const userNameHandler = (name) => {
    setName(name);
    localStorage.setItem("name", name);
  };
  const userDetailsHandler = (name, email, phone, profileImageUrl) => {
    setName(name);
    localStorage.setItem("name", name);
    setEmail(email);
    localStorage.setItem("email", email);
    setPhone(phone);
    localStorage.setItem("phone", phone);
    setProfileImageUrl(profileImageUrl);
    localStorage.setItem("profileImageUrl", profileImageUrl);
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
