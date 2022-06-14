import React, { useState, useContext, useEffect } from "react";
import apnaMart from "../api/apnaMart";
import Main from "../layout/Main";
import AuthContext from "../store/authContext";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
const Users = () => {
  const [UserData, setUserData] = useState([]);
  const [userCount, setuserCount] = useState("");
  const authContext = useContext(AuthContext);
  const [offset, setoffset] = useState(0);
  const [limit, setlimit] = useState(25);

  useEffect(() => {
    getUserDetails();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getUserDetails = async () => {
    try {
      const token = authContext.token;
      const response = await apnaMart.post(
        `/administrator/users`,
        {
          offset,
          limit,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setuserCount(response.data["users"]["count"]);
        setUserData(response.data["users"]["rows"]);
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
      {userCount > 0 && (
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
                  className="px-6 py-3 text-left text-lg font-semibold text-gray-900 capatalize tracking-wider"
                >
                  Role
                </th>
              </tr>
            </thead>
            <tbody className="bg-indigo-100 text-gray-900 divide-y-2 divide-white">
              {UserData.map((person) => (
                <tr key={uuidv4()}>
                  <td className="px-6 py-4 whitespace-nowrap text-base font-medium">
                    {person.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base font-medium">
                    {person.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base font-medium">
                    {person.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base font-medium">
                    {person.isAdmin ? "Admin" : "User"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Main>
  );
};

export default Users;
