import React from "react";
import { TrashIcon, PencilAltIcon } from "@heroicons/react/outline";
import { v4 as uuidv4 } from "uuid";

const ListProduct = ({ data }) => {
  return (
    <>
      {data?.length > 0 && (
        <div className=" overflow-x-auto   ">
          <table className="min-w-full rounded-b-lg ">
            <thead className="  h-16 text-indigo-700">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-lg font-semibold  capatalize tracking-wider"
                >
                  Image
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-lg font-semibold  capatalize tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-lg font-semibold  capatalize tracking-wider"
                >
                  Brand
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-lg font-semibold  capatalize tracking-wider"
                >
                  Category
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-lg font-semibold  capitalize  tracking-wider"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-lg font-semibold  capitalize  tracking-wider"
                >
                  Discount
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-lg font-semibold  capitalize  tracking-wider"
                >
                  Stock
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
                >
                  isDealOfTheDay
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
            <tbody className=" text-gray-900  items-center ">
              {data?.map((person) => (
                <tr
                  key={uuidv4()}
                  className="h-20 text-sm  text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-base font-medium">
                    <img
                      src={`https://api.theshubham.dev/${person.imageUrl}`}
                      alt=""
                      className="h-10"
                    />
                  </td>
                  <td className="px-4 py-4  capitalize whitespace-nowrap text-base font-medium">
                    <p title={person.title} className="w-48 truncate ">
                      {person.name}
                    </p>
                  </td>
                  <td className="px-4 py-4  capitalize whitespace-nowrap text-base font-medium">
                    {person.brand.brandName}
                  </td>
                  <td className="px-4 py-4  capitalize whitespace-nowrap text-base font-medium">
                    {person.category}
                  </td>
                  <td className="px-4 py-4   capitalize whitespace-nowrap text-base font-medium">
                    {person.price.toFixed(2)}
                  </td>
                  <td className="px-4 py-4  capitalize whitespace-nowrap text-base font-medium">
                    {person.discount}%
                  </td>
                  <td className="px-4 py-4  capitalize whitespace-nowrap text-base font-medium">
                    {person.stock}
                  </td>
                  <td className="px-4 py-4  capitalize whitespace-nowrap text-base font-medium">
                    <span className="bg-indigo-200 rounded-full p-1 px-4">
                      {" "}
                      {person.isActive ? "True" : "False"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base  font-medium">
                    <span className="bg-indigo-200 rounded-full p-1 px-4">
                      {" "}
                      {person.isDealOfTheDay ? "True" : "False"}
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
  );
};

export default ListProduct;
