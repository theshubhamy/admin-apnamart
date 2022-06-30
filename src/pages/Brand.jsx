import React, { useEffect, useState, useContext } from "react";
import apnaMart from "../api/apnaMart";
import AuthContext from "../store/authContext";
import Main from "../layout/Main";
import AddBrand from "../components/brands/AddBrand";
import ListBrands from "../components/brands/ListBrands";
import { toast } from "react-toastify";
const Brand = () => {
  const [isAddBrand, setIsAddBrand] = useState(false);
  const authContext = useContext(AuthContext);
  const [brands, setBrands] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const startEditingHandler = () => {
    setIsEdit(true);
  };
  const stopEditingHandler = () => {
    setIsEdit(false);
  };
  useEffect(() => {
    getBrands();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddBrand]);

  const getBrands = async () => {
    try {
      const response = await apnaMart.get("/admin/brands", {
        headers: { Authorization: `Bearer ${authContext.token}` },
      });
      if (response.status === 200) {
        setBrands(response.data.brands.rows);
        setIsAddBrand(false);
      }
    } catch (error) {
      toast(error.response.message);
    }
  };
  const createBrandHandler = async (formData) => {
    try {
      const response = await apnaMart.post(`/admin/add-brand`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authContext.token}`,
        },
      });
      if (response.status === 201) {
        toast.success(response.data.message);
        setIsAddBrand(true);
        stopEditingHandler();
      }
    } catch (error) {
      toast.error(error.response.message);
    }
  };
  return (
    <Main>
      <div className="w-full shadow-md my-6 ">
        <div className=" px-4 sm:px-10 py-4 md:py-7 rounded-t-lg bg-gray-200 ">
          <div className=" flex  items-center justify-between">
            <p className="text-base sm:text-lg md:text-xl text-indigo-600 lg:text-2xl font-bold leading-normal ">
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
        {isEdit ? (
          <AddBrand onSave={createBrandHandler} onCancel={stopEditingHandler} />
        ) : (
          <ListBrands data={brands} />
        )}
      </div>
    </Main>
  );
};

export default Brand;
