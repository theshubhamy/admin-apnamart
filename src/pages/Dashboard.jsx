import React, { useEffect } from "react";
import Main from "../layout/Main";
// eslint-disable-next-line no-unused-vars
import Chart from "chart.js/auto";
import { Doughnut, Line, Pie, Bar } from "react-chartjs-2";
import {
  getAllProducts,
  getAllCategories,
} from "../store/actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrders } from "../store/actions/orderAction";
import { getAllUsers, clearErrors } from "../store/actions/userActions";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { products } = useSelector((state) => state.allProducts);
  const { orders } = useSelector((state) => state.orders);
  const { users } = useSelector((state) => state.users);
  const { categories } = useSelector((state) => state.allCategories);
  let outOfStock = 0;

  products?.forEach((item) => {
    if (item.stock === 0) {
      outOfStock += 1;
    }
  });

  useEffect(() => {
    if (userInfo !== null) {
      dispatch(getAllProducts());
      dispatch(getAllOrders());
      dispatch(getAllUsers());
      dispatch(getAllCategories());
      dispatch(clearErrors());
    }
    return () => {};
  }, [dispatch, userInfo]);
  

  let totalAmount = orders?.reduce(
    (total, order) => total + order.totalAmount,
    0
  );
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date();
  const lineState = {
    labels: months,
    datasets: [
      {
        label: `Sales in ${date.getFullYear() - 2}`,
        borderColor: "#8A39E1",
        backgroundColor: "#8A39E1",
        data: months.map((m, i) =>
          orders
            ?.filter(
              (od) =>
                new Date(od.createdAt).getMonth() === i &&
                new Date(od.createdAt).getFullYear() === date.getFullYear() - 2
            )
            .reduce((total, od) => total + od.totalPrice, 0)
        ),
      },
      {
        label: `Sales in ${date.getFullYear() - 1}`,
        borderColor: "#06b6d4",
        backgroundColor: "#06b6d4",
        data: months.map((m, i) =>
          orders
            ?.filter(
              (od) =>
                new Date(od.createdAt).getMonth() === i &&
                new Date(od.createdAt).getFullYear() === date.getFullYear() - 1
            )
            .reduce((total, od) => total + od.totalPrice, 0)
        ),
      },
      {
        label: `Sales in ${date.getFullYear()}`,
        borderColor: "#4ade80",
        backgroundColor: "#4ade80",
        data: months.map((m, i) =>
          orders
            ?.filter(
              (od) =>
                new Date(od.createdAt).getMonth() === i &&
                new Date(od.createdAt).getFullYear() === date.getFullYear()
            )
            .reduce((total, od) => total + od.totalPrice, 0)
        ),
      },
    ],
  };

  const statuses = ["Processing", "Shipped", "Delivered", "Cancelled"];

  const pieState = {
    labels: statuses,
    datasets: [
      {
        backgroundColor: ["#4f46e5", "#eab308", "#14b8a6", "#dc2626"],
        hoverBackgroundColor: ["#4f46e5", "#eab308", "#14b8a6", "#dc2626"],
        data: statuses.map(
          (status) =>
            orders?.filter((item) => item.orderStatus === status).length
        ),
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "In Stock"],
    datasets: [
      {
        backgroundColor: ["#06b6d4", "#a855f7"],
        hoverBackgroundColor: ["#06b6d4", "#a855f7"],
        data: [outOfStock, products?.length - outOfStock],
      },
    ],
  };

  const barState = {
    labels: categories?.map((item) => item.name),
    datasets: [
      {
        label: "Products",
        borderColor: "#9333ea",
        backgroundColor: "#6366f1",
        hoverBackgroundColor: "#6366f1",
        data: categories?.map(
          (cat) => products?.filter((item) => item.category === cat.name).length
        ),
      },
    ],
  };
  return (
    <>
      <Main>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-6 my-4">
          <div className="flex flex-col bg-indigo-500 text-white gap-2 rounded-xl shadow  p-6">
            <h4 className="text-gray-100 font-medium">Total Sales Amount</h4>
            <h2 className="text-2xl font-bold">
              ₹ {totalAmount?.toLocaleString()}
            </h2>
          </div>
          <div className="flex flex-col bg-yellow-500 text-white gap-2 rounded-xl shadow p-6">
            <h4 className="text-gray-100 font-medium">Total Orders</h4>
            <h2 className="text-2xl font-bold">{orders?.length}</h2>
          </div>
          <div className="flex flex-col bg-purple-500 text-white gap-2 rounded-xl shadow p-6">
            <h4 className="text-gray-100 font-medium">Total Products</h4>
            <h2 className="text-2xl font-bold">{products?.length}</h2>
          </div>
          <div className="flex flex-col bg-cyan-500 text-white gap-2 rounded-xl shadow p-6">
            <h4 className="text-gray-100 font-medium">Total Users</h4>
            <h2 className="text-2xl font-bold">{users?.length}</h2>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-8 min-w-full  my-4">
          <div className="bg-white rounded-xl h-auto w-full shadow p-2">
            <Line data={lineState} />
          </div>

          <div className="bg-white rounded-xl shadow p-4 text-center">
            <span className="font-medium uppercase text-gray-800">
              Order Status
            </span>
            <Pie data={pieState} />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-8 min-w-full my-4 ">
          <div className="bg-white rounded-xl h-auto w-full shadow p-2">
            <Bar data={barState} />
          </div>

          <div className="bg-white rounded-xl shadow p-4 text-center">
            <span className="font-medium uppercase text-gray-800">
              Stock Status
            </span>
            <Doughnut data={doughnutState} />
          </div>
        </div>
      </Main>
    </>
  );
};

export default Dashboard;
