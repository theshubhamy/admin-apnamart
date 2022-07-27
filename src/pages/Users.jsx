import React, { useEffect } from "react";

import Main from "../layout/Main";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../store/actions/userActions";
import { v4 as uuidv4 } from "uuid";

const Users = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(getAllUsers());
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Main>
      <div className="flex justify-center items-center mt-5">
        <h1 className="text-indigo-600 font-bold text-4xl">Users</h1>
      </div>

      {users && (
        <div className="shadow overflow-x-auto  my-10 border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-indigo-200 text-gray-900">
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
                  Phone
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-lg font-semibold text-gray-900 capitalize  tracking-wider"
                >
                  Address
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-lg font-semibold text-gray-900 capatalize tracking-wider"
                >
                  Role
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-100 text-gray-900 divide-y-2 divide-white">
              {users?.map((person) => (
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
                    {person?.address ? (
                      <>
                        <span>{person.address?.city}</span>,
                        <span> {person.address?.zip}</span>
                      </>
                    ) : (
                      "N/A"
                    )}
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
