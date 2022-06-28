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
      }
    } catch (error) {
      toast.error(error.respnse.message);
    }
  };
  return (
    <Main>
      <AddBrand onSave={createBrandHandler} />
      <ListBrands data={brands} />
    </Main>
  );
};

export default Brand;
