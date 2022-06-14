import React from "react";
import Main from "../layout/Main";
import AddBrand from "../components/barnds/AddBrand";
import ListBrands from "../components/barnds/ListBrands";
const Brand = () => {
  return (
    <Main>
      <AddBrand />
      <ListBrands />
    </Main>
  );
};

export default Brand;
