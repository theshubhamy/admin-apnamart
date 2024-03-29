import React, { useEffect, useState } from "react";
import Main from "../layout/Main";
import apnaMart from "../api/apnaMart";
import { useSelector } from "react-redux";
import AddCategory from "../components/categories/AddCategory";
import ListCategory from "../components/categories/ListCategory";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const Categories = () => {
  const [isAddCategory, setIsAddCategory] = useState(false);
  const { userInfo } = useSelector((state) => state.userLogin);
  const [Categories, setCategories] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const startEditingHandler = () => {
    setIsEdit(true);
  };
  const stopEditingHandler = () => {
    setIsEdit(false);
  };
  useEffect(() => {
    getCategories();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddCategory]);

  const getCategories = async () => {
    try {
      const response = await apnaMart.get("/admin/get-all-categories", {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      if (response.status === 200) {
        setCategories(response.data.categories);
        setIsAddCategory(false);
      }
    } catch (error) {
      toast(error.response.msg);
    }
  };
  const createCategoryHandler = async (formData) => {
    try {
      const response = await apnaMart.post(`/admin/create-category`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      if (response.status === 201) {
        toast.success(response.data.msg);
        setIsAddCategory(true);
        stopEditingHandler();
      }
    } catch (error) {
      toast.error(error.response.message);
    }
  };
  return (
    <Main>
      <div className="flex justify-center items-center mt-5">
        <h1 className="text-indigo-600 font-bold text-4xl">Categories</h1>
      </div>

      <div className="w-full shadow-md my-6 ">
        <div className=" px-4 sm:px-10 py-4 md:py-7 rounded-t-lg bg-gray-200 ">
          <div className=" flex  items-center justify-between">
            <Link
              to="/categories"
              className="text-base sm:text-lg md:text-xl text-indigo-600 lg:text-2xl font-bold leading-normal "
            >
              Categories
            </Link>
            <div>
              <button
                onClick={startEditingHandler}
                className="inline-flex sm:ml-3 mt-4 sm:mt-0 items-start justify-start px-6 py-3 bg-indigo-500 hover:bg-indigo-600 focus:outline-none rounded"
              >
                <p className="text-sm font-medium leading-none text-white">
                  New Category
                </p>
              </button>
            </div>
          </div>
        </div>
        {isEdit ? (
          <AddCategory
            onSave={createCategoryHandler}
            onCancel={stopEditingHandler}
          />
        ) : (
          <ListCategory data={Categories} />
        )}
      </div>
    </Main>
  );
};

export default Categories;
