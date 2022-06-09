import React, { useState, useContext, useEffect } from "react";
import apnaMart from "../api/apnaMart";
import Main from "../layout/Main";
import AuthContext from "../store/authContext";
import { toast } from "react-toastify";
const Users = () => {
  const [UserData, setUserData] = useState([]);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    getUserDetails();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getUserDetails = async () => {
    try {
      const token = authContext.token;
      const response = await apnaMart.post(
        `/administrator/add-product`,
        {
          title: "Apple Macbook pro",
          price: 130000.0,
          costPrice: 143000.0,
          discount: 13000.0,
          description: "Apple Macbook pro M1 8Gb, 256Gb",
          stock: 100,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setUserData(response.data["users"]);
      } else {
        toast(response.data.message);
      }
    } catch (error) {
      toast(error.response.data.message);
    }
  };
  return (
    <Main>
      {" "}
      <div className="shadow-xl overflow-hidden  my-10 border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-indigo-400 text-gray-900">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-lg font-semibold text-gray-900 capatalize tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-lg font-semibold text-gray-900 capatalize tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-lg font-semibold text-gray-900 capitalize  tracking-wider"
              >
                Phone number
              </th>
              <th
                scope="col"
                className="px-6 py-3  text-lg font-semibold text-gray-900 capitalize  tracking-wider"
              >
                Time
              </th>
            </tr>
          </thead>
          <tbody className="bg-indigo-100 text-gray-900 divide-y-2 divide-white">
            {UserData.length > 0 &&
              UserData.map((person) => (
                <tr key={person.paymentid}>
                  <td className="px-6 py-4 whitespace-nowrap text-base font-medium">
                    {person.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base font-medium">
                    {person.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base font-medium">
                    {person.phone}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-right text-base font-medium">
                    {person.createdAt}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Main>
  );
};

export default Users;
