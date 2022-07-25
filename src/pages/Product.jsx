import React, { useState, useEffect } from "react";
import Main from "../layout/Main";
import apnaMart from "../api/apnaMart";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../store/actions/productAction";
import AddProduct from "../components/products/AddProduct";
import ListProduct from "../components/products/ListProduct";
import { toast } from "react-toastify";
const Product = () => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [isAddProduct, setIsAddProduct] = useState(false);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { products } = useSelector((state) => state.allProducts);
  const startEditingHandler = () => {
    setIsEdit(true);
  };
  const stopEditingHandler = () => {
    setIsEdit(false);
  };
  useEffect(() => {
    dispatch(getAllProducts());
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddProduct]);

  const createProductHandler = async (formData) => {
    try {
      const response = await apnaMart.post(`/admin/create-product`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
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
      <div className="flex justify-center items-center mt-5">
        <h1 className="text-indigo-600 font-bold text-4xl">Products</h1>
      </div>
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
                  New Product
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

export default Product;
