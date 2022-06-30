import React, { useState } from "react";
const appContext = React.createContext({
  AllUsers: "",
  setAllUsers: () => {},
});
const retrieveStoredData = () => {
  const storedAllUsers = localStorage.getItem("AllUsers");

  return {
    AllUsers: storedAllUsers,
  };
};
export const AppContextProvider = (props) => {
  const storedData = retrieveStoredData();
  var initialAllUsers;

  if (storedData) {
    initialAllUsers = storedData.AllUsers;
  }

  const [AllUsers, setAllUsers] = useState(initialAllUsers);

  const AllUsersHandler = (AllUsers) => {
    setAllUsers(AllUsers);
    localStorage.setItem("AllUsers", AllUsers);
  };
  const userDetailsHandler = (AllUsers) => {
    setAllUsers(AllUsers);
    localStorage.setItem("AllUsers", AllUsers);
  };
  const contextValue = {
    AllUsers: AllUsers,

    setAllUsers: AllUsersHandler,

    userDetails: userDetailsHandler,
  };
  return (
    <appContext.Provider value={contextValue}>
      {props.children}
    </appContext.Provider>
  );
};

export default appContext;
