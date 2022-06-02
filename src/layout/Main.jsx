import React from "react";

const Main = (props) => {
  return (
    <div className="md:ml-64 bg-white">
      <div className="px-4 md:px-10 mx-auto w-full">{props.children}</div>
    </div>
  );
};

export default Main;
