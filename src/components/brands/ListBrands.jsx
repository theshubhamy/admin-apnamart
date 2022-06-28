import React, { useState } from "react";
import { TrashIcon, PencilAltIcon } from "@heroicons/react/outline";
import { v4 as uuidv4 } from "uuid";
import AddBrand from "./AddBrand";
const ListBrands = ({ data }) => {
  const [isEdit, setIsEdit] = useState(false);
  const startEditingHandler = () => {
    setIsEdit(true);
  };
  const stopEditingHandler = () => {
    setIsEdit(false);
  };
  return (
    <>
      <div className="w-full sm:px-6">
        <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
          <div className="sm:flex items-center justify-between">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
              Brands
            </p>
            <div>
              <button
                onClick={startEditingHandler}
                className="inline-flex sm:ml-3 mt-4 sm:mt-0 items-start justify-start px-6 py-3 bg-indigo-500 hover:bg-indigo-600 focus:outline-none rounded"
              >
                <p className="text-sm font-medium leading-none text-white">
                  New Brand
                </p>
              </button>
            </div>
          </div>
        </div>
        {isEdit && <AddBrand onCancel={stopEditingHandler} />}
        {!isEdit && (
          <>
            {data.length > 0 && (
              <div className=" overflow-hidden border-b border-gray-200 ">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className=" text-indigo-700">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-lg font-semibold  capatalize tracking-wider"
                      >
                        Brand Logo
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-lg font-semibold  capatalize tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-lg font-semibold  capitalize  tracking-wider"
                      >
                        Description
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-lg font-semibold  capatalize tracking-wider"
                      >
                        isActive
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-lg font-semibold  capatalize tracking-wider"
                      ></th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-lg font-semibold  capatalize tracking-wider"
                      ></th>
                    </tr>
                  </thead>
                  <tbody className=" text-gray-900 ">
                    {data.map((person) => (
                      <tr
                        key={uuidv4()}
                        className="h-20 text-sm  text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-base font-medium">
                          <img
                            src={`https://api.theshubham.dev/${person.iconUrl}`}
                            alt=""
                            className="h-10"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-base font-medium">
                          {person.name}
                        </td>
                        <td className="px-6 py-4 overflow-hidden text-base font-medium">
                          <p
                            title={person.description}
                            className="w-64 truncate "
                          >
                            {person.description}
                          </p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-base  font-medium">
                          <span className="bg-indigo-200 rounded-full p-1 px-4">
                            {" "}
                            {person.isActive ? "True" : "False"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-base font-medium">
                          <button>
                            <PencilAltIcon className="h-7 text-indigo-600" />
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-base font-medium">
                          <button>
                            <TrashIcon className="h-7 text-red-600" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ListBrands;
