import React, { Fragment, useEffect, useState } from "react";
import Main from "../layout/Main";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../store/actions/orderAction";
import { PencilAltIcon } from "@heroicons/react/solid";
import { Dialog, Transition } from "@headlessui/react";
import UpdateModel from "../components/orders/UpdateModel";
import apnaMart from "../api/apnaMart";
const Order = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [newid, setId] = useState("");

  function closeUpdateModal() {
    setIsOpen(false);
  }
  function openUpdateModal(id) {
    setIsOpen(true);
    setId(id);
  }
  const { orders } = useSelector((state) => state.orders);
  const { userInfo } = useSelector((state) => state.userLogin);
  useEffect(() => {
    dispatch(getAllOrders());
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleUpdate = async (updateData) => {
    const { newstatus } = updateData;
    openUpdateModal();
    if (newid === "" && newstatus === "") {
      toast.error("Please select an order to update");
    } else {
      try {
        const response = await apnaMart.put(
          `/admin/update-order-status`,
          {
            id: newid,
            status: newstatus,
          },
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        if (response.status === 200) {
          toast.success(response.data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };
  return (
    <Main>
      <div>
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
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-lg font-semibold text-gray-900 capatalize tracking-wider"
                  ></th>
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
                    <td className="px-6 py-4 whitespace-nowrap text-base font-medium">
                      <button
                        onClick={() => {
                          openUpdateModal(item._id);
                        }}
                      >
                        <PencilAltIcon className="h-7 text-indigo-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto "
          onClose={closeUpdateModal}
        >
          <div className="min-h-screen px-4 text-center items-end">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen  align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-100"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-2xl  py-2 px-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-50  shadow-md rounded-xl">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-bold  text-center my-3 leading-6 text-gray-900"
                >
                  Upadte Staus model
                </Dialog.Title>

                <UpdateModel
                  onSaveUpdateData={handleUpdate}
                  onClose={closeUpdateModal}
                />
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </Main>
  );
};

export default Order;
