import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { MenuIcon, XIcon, LogoutIcon } from "@heroicons/react/outline";
import { UserCircleIcon } from "@heroicons/react/solid";
//import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/outline";
import AuthContext from "../store/authContext";
import UserContext from "../store/userContext";

const Sidebar = () => {
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);
  ///signout handler
  const SignoutHandler = () => {
    try {
      authContext.logout();
      
    } catch (error) {
      console.log(error.message);
    }
  };
  const [collapseShow, setCollapseShow] = useState("hidden");

  return (
    <>
      <div className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-lg bg-gray-50  flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-4 md:h-screen">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap  flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler desktop*/}

          <Link
            exact="true"
            to="/"
            className="flex-shrink-0 flex items-center justify-center text-indigo-600 text-4xl px-3 py-2 font-bold rounded-md "
          >
            Apna Mart
          </Link>
          <div className=" md:hidden">
            <button
              type="button"
              onClick={() => setCollapseShow("bg-gray-50 m-2 py-3 px-6")}
              className="rounded-md p-1 inline-flex items-center justify-center text-black "
            >
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-7 w-7" aria-hidden="true" />
            </button>
          </div>
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header mobile */}
            <div className="md:min-w-full md:hidden block my-3 ">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    exact="true"
                    to="/"
                    className="flex-shrink-0 flex items-center grow text-center text-4xl text-indigo-600  py-2 font-bold rounded-md "
                  >
                    Apna Mart
                  </Link>
                </div>
                <div className="w-6/12 flex  right-0 justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-red-500 opacity-100 md:hidden px-3 text-xl leading-none bg-transparent "
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <XIcon className="h-6 w-6 " aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>

            <div className="xl:mt-6 flex flex-col justify-start items-start  px-2 w-full space-y-2 pb-5 ">
              <Link
                to="/dashboard"
                onClick={() => setCollapseShow("hidden")}
                className="focus:outline-none flex jusitfy-start hover:text-white focus:bg-indigo-700 focus:text-white hover:bg-indigo-700 text-gray-600 rounded py-3 pl-4 items-center space-x-6 w-full "
              >
                <p className="text-base leading-4 ">Dashboard</p>
              </Link>
              <Link
                to="/user-list"
                onClick={() => setCollapseShow("hidden")}
                className="focus:outline-none flex jusitfy-start hover:text-white focus:bg-indigo-700 focus:text-white hover:bg-indigo-700 text-gray-600 rounded py-3 pl-4  items-center w-full  space-x-6"
              >
                <p className="text-base leading-4 ">User List</p>
              </Link>
              <Link
                to="/"
                onClick={() => setCollapseShow("hidden")}
                className="focus:outline-none flex justify-start items-center space-x-6 hover:text-white focus:bg-indigo-700 focus:text-white hover:bg-indigo-700 text-gray-600 rounded  py-3 pl-4  w-full "
              >
                <p className="text-base leading-4  ">Product</p>
              </Link>
              <Link
                to="/"
                onClick={() => setCollapseShow("hidden")}
                className="flex justify-start items-center space-x-6 hover:text-white focus:outline-none focus:bg-indigo-700 focus:text-white hover:bg-indigo-700 text-gray-600 rounded py-3 pl-4  w-full "
              >
                <p className="text-base leading-4  ">Goals</p>
              </Link>
            </div>
            <div className="w-full px-4">
              <hr className=" border-indigo-00 w-full" />
            </div>
            <div className="mt-6 flex flex-col justify-start items-start  px-4 w-full space-y-3 pb-5 ">
              <Link
                to="/"
                onClick={() => setCollapseShow("hidden")}
                className="focus:outline-none flex justify-start items-center space-x-6 hover:text-white focus:bg-indigo-700 focus:text-white hover:bg-indigo-700 text-gray-600 rounded  py-3 pl-4  w-full "
              >
                <p className="text-base leading-4  ">Security</p>
              </Link>
              <Link
                to="/"
                onClick={() => setCollapseShow("hidden")}
                className="focus:outline-none flex justify-start items-center space-x-6 hover:text-white focus:bg-indigo-700 focus:text-white hover:bg-indigo-700 text-gray-600 rounded  py-3 pl-4  w-full "
              >
                <p className="text-base leading-4  ">Settings</p>
              </Link>
            </div>
            <div className="flex flex-col justify-between items-center">
              <div className="w-full px-4">
                <hr className=" border-gray-100 w-full" />
              </div>
              <div className="mt-6 flex flex-col justify-start items-start  px-4 w-full space-y-3 pb-5 ">
                <Link
                  to="/"
                  onClick={() => setCollapseShow("hidden")}
                  className="focus:outline-none flex justify-start items-center space-x-6 hover:text-white focus:bg-indigo-700 focus:text-white hover:bg-indigo-700 text-gray-600 rounded  py-3 pl-4  w-full "
                >
                  <p className="text-base leading-4  ">Account Settings</p>
                </Link>
              </div>
              <div className=" flex  bg-indigo-500 rounded-md shadow-md  justify-between space-x-2 items-center h-full py-4 md:px-3 px-4 w-full  ">
                <div className="flex items-center">
                  {userContext.profileImageUrl === "" ? (
                    <img
                      src={userContext.profileImageUrl}
                      alt="avatar"
                      className="mx-2 md:sr-only"
                    />
                  ) : (
                    <UserCircleIcon className="w-10 h-10 mx-2 md:sr-only" />
                  )}

                  <div className="flex flex-col justify-start items-start space-y-2">
                    <p className="cursor-pointer text-base leading-4 text-white">
                      {userContext.name}
                    </p>
                    <p className="cursor-pointer text-xs leading-3 text-gray-200">
                      {userContext.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={SignoutHandler}
                  aria-label="visit"
                  className=" focus:ring-2 focus:outline-none    rounded-full"
                >
                  <LogoutIcon className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
