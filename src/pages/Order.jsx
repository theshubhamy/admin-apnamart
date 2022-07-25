import React, { useEffect } from "react";
import Main from "../layout/Main";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../store/actions/orderAction";
const Order = () => {
  const dispatch = useDispatch();

  const { orders } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getAllOrders());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  return (
    <Main>
      <div className="flex justify-center items-center mt-5">
        <h1 className="text-indigo-600 font-bold text-4xl">Orders</h1>
      </div>

      {orders?.length > 0 && (
        <div className="shadow overflow-x-auto  my-10 border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-indigo-200 text-gray-900">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-lg font-semibold text-gray-900 capatalize tracking-wider"
                >
                  OrderID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-lg font-semibold text-gray-900 capatalize tracking-wider"
                >
                  BuyerEmail
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-lg font-semibold text-gray-900 capitalize  tracking-wider"
                >
                  TotalAmount
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-lg font-semibold text-gray-900 capitalize  tracking-wider"
                >
                  PaymentStatus
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-lg font-semibold text-gray-900 capatalize tracking-wider"
                >
                  OrderStatus
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-100 text-gray-900 divide-y-2 divide-white">
              {orders?.map((item) => (
                <tr key={uuidv4()}>
                  <td className="px-6 py-4 whitespace-nowrap text-base font-medium">
                    {item.razorpay.orderId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base font-medium">
                    {item.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base font-medium">
                    {item.totalAmount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base font-medium">
                    {item.paymentStatus}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base font-medium">
                    {item.orderStatus}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Main>
  );
};

export default Order;
