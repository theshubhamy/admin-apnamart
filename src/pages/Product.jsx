import React, { useState, useContext, useEffect } from "react";
import Main from "../layout/Main";
import AuthContext from "../store/authContext";
import apnaMart from "../api/apnaMart";
import AddProduct from "../components/products/AddProduct";
import ListProduct from "../components/products/ListProduct";
import { toast } from "react-toastify";
const Products = () => {
  const authContext = useContext(AuthContext);
  const [isEdit, setIsEdit] = useState(false);
  const [products, setproducts] = useState([]);
  const [isAddProduct, setIsAddProduct] = useState(false);
  const startEditingHandler = () => {
    setIsEdit(true);
  };
  const stopEditingHandler = () => {
    setIsEdit(false);
  };
  useEffect(() => {
    getProducts();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddProduct]);
  const getProducts = async () => {
    try {
      const response = await apnaMart.post(
        "/admin/all-products",
        {
          offset: 0,
          limit: 25,
        },
        {
          headers: { Authorization: `Bearer ${authContext.token}` },
        }
      );
      if (response.status === 200) {
        setproducts(response.data.products.rows);
        setIsAddProduct(false);
      }
    } catch (error) {
      toast(error.response.message);
    }
  };
  const createProductHandler = async (formData) => {
    try {
      const response = await apnaMart.post(`/admin/add-brand`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authContext.token}`,
        },
      });
      if (response.status === 201) {
        toast.success(response.data.message);
        setIsAddProduct(true);
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
              Products
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
          <AddProduct
            onSave={createProductHandler}
            onCancel={stopEditingHandler}
          />
        ) : (
          <ListProduct data={products} />
        )}
      </div>
    </Main>
  );
};

export default Products;
