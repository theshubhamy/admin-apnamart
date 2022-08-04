import React, { useState } from "react";

const UpdateModel = (props) => {
  const [newstatus, setstatus] = useState("");
  const updateFormHandler = () => {
    const updateData = {
      newstatus,
    };
    props.onSaveUpdateData(updateData);
    setstatus("");
    props.onClose();
  };
  return (
    <div className="p-10">
      <div className="relative my-10">
        <select
          id="Brand"
          name="Brand"
          autoComplete="Brand"
          value={newstatus}
          onChange={(e) => setstatus(e.target.value)}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <optgroup className="space-y-2">
            <option value="">Select Brand</option>
            <option value="Processing">Processing</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </optgroup>
        </select>
      </div>

      <div className="flex items-center justify-end space-x-5 text-lg w-full">
        <button
          className="focus:outline-none ml-3 transition duration-150 text-red-500  ease-in-out  hover:bg-red-400 hover:text-white  focus:ring-2 focus:ring-offset-2 focus:ring-red-500 bg-white shadow-md  rounded-md px-6 py-2 "
          onClick={props.onClose}
        >
          Cancel
        </button>
        <button
          onClick={() => updateFormHandler()}
          className="focus:outline-none shadow-md transition duration-150 ease-in-out  rounded-md text-white bg-indigo-600 hover:bg-indigo-700  focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500  px-6 py-2 "
        >
          Submit
        </button>
      </div>
      <div
        className="cursor-pointer absolute top-0 right-0 mt-4 mr-5  border p-1 rounded-md shadow-md border-red-500 bg-red-200 transition duration-150 ease-in-out"
        onClick={props.onClose}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Close"
          className="icon icon-tabler icon-tabler-x"
          width={20}
          height={20}
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          stroke="#dc2626"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <line x1={18} y1={6} x2={6} y2={18} />
          <line x1={6} y1={6} x2={18} y2={18} />
        </svg>
      </div>
    </div>
  );
};

export default UpdateModel;
