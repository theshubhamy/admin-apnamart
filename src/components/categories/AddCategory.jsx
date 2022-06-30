import React, { useState } from "react";
import { toast } from "react-toastify";
const AddCategory = (props) => {
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [coverImage, setcoverImage] = useState("");
  const [brandLogo, setbrandLogo] = useState("");
  const brandHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("icon", brandLogo);
      formData.append("image", coverImage);
      if (name === "" || description === "" || brandLogo === "") {
        toast.warn("Please enter a valid details (non empty Value).");
      } else {
        props.onSave(formData);
      }
    } catch (error) {
      toast.error(error.respnse.message);
    }

    setname("");
    setdescription("");
    setcoverImage("");
    setbrandLogo("");
  };

  return (
    <>
      <div className=" md:col-span-2">
        <div className="sm:overflow-hidden ">
          <div className="px-4 py-10  space-y-4 sm:p-6">
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3 sm:col-span-2">
                <label
                  htmlFor="brandTitle"
                  className="block text-base font-medium text-indigo-700"
                >
                  Name
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="brandTitle"
                    id="brandTitle"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full  rounded-md sm:text-sm border-gray-300"
                  />
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-base font-medium text-indigo-700"
              >
                Description
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={description}
                  onChange={(e) => setdescription(e.target.value)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="brandlogo"
                className="block text-base font-medium text-indigo-700"
              >
                Icon
              </label>
              <div className="mt-1 flex items-center">
                <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                  {brandLogo !== "" ? (
                    <div className=" h-12 w-12 rounded-full">
                      <img src={URL.createObjectURL(brandLogo)} alt="logo" />
                    </div>
                  ) : (
                    <svg
                      className="h-full w-full text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  )}
                </span>
                <label
                  htmlFor="brandlogo"
                  className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Change
                  <input
                    onChange={(e) => {
                      setbrandLogo(e.target.files[0]);
                    }}
                    accept="image/*"
                    id="brandlogo"
                    name="brandlogo"
                    type="file"
                    className="sr-only"
                  />
                </label>
              </div>
            </div>
            <div>
              <label
                htmlFor="file-upload"
                className="block text-base font-medium text-indigo-700"
              >
                Cover photo
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-indigo-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  {coverImage !== "" ? (
                    <div className=" my-4 md:max-h-80 max-w-5xl  rounded-full">
                      <img src={URL.createObjectURL(coverImage)} alt="logo" />
                    </div>
                  ) : (
                    <svg
                      className="mx-auto h-12 w-12 text-indigo-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  <div className="flex text-sm justify-center items-center text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span className=" flex  text-center">Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setcoverImage(e.target.files[0])}
                        className="sr-only"
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-6 space-x-4 bg-gray-50 text-right sm:px-6">
            <button
              onClick={props.onCancel}
              className="inline-flex justify-center whitespace-nowrap py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-400 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              onClick={brandHandler}
              className="inline-flex justify-center whitespace-nowrap py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-400 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Brand
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCategory;
