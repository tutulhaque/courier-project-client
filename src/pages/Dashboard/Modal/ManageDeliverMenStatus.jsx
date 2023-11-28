import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

// ManageButtonModal.jsx
const ManageDeliverMenStatus = ({ selectedParcel, closeModal }) => {
    const queryClient = useQueryClient();
    const { user} = useContext(AuthContext);

    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

    const handleAssignDelivery = event => {
        event.preventDefault();
        const form = event.target;
        const deliveryDate = form.deliveryDate.value;
        const status = form.status.value;

        const updatedParcel = { deliveryDate, status,selectedDeliveryMen:user.email }
        console.log(updatedParcel)
        fetch(`http://localhost:5000/parcels/delivered/${selectedParcel._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedParcel)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    Navigate('/dashboard/all-parcels');
                    refetch();
                    Swal.fire({
                        title: 'Success!',
                        text: 'Product Updated Successfully.',
                        icon: 'success',
                        confirmButtonText: 'Close'
                    })

                }

            })
        closeModal();

    }
    // const handleAssignDelivery = () => {
    //     // Logic to assign delivery
    //     // ...

    //     closeModal();
    // };

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
                <div className="fixed inset-0 bg-black opacity-50"></div>
                <div className="modal-container bg-white w-[800px] mx-auto rounded shadow-lg z-50 p-6">
                    <h2 className="text-xl font-semibold mb-4">Manage Parcel</h2>
                    <div className="max-w-7xl mx-auto bg-[#f7f7f7] p-10">
                        <h1 className="text-4xl font-extrabold">Add Parcel</h1>
                        <form onSubmit={handleAssignDelivery}>

                            {/* Row-02 */}
                            <div className="flex gap-3 my-3">
                                <div className="form-control w-1/2">
                                    <label className="label">
                                        <span className="label-text">Delivery date</span>
                                    </label>
                                    <label className="input-group">
                                        <input required type="date" name="deliveryDate" className="input input-bordered w-full" />
                                    </label>
                                </div>
                                <div className="form-control w-1/2">
                                    <label className="label">
                                        <span className="label-text">Select A Delivery Man</span>
                                    </label>
                                    <select name="status" className="select w-full">
                                        <option value="delivered">Delivered</option>
                                        <option value="returned">Returned</option>
                                        <option value="cancel">Cancel</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <input type="submit" value="Assign" className="btn btn-neutral" />
                            </div>
                        </form>
                    </div>
                    <div className="flex justify-end mt-4">
                        <button onClick={closeModal} className="btn btn-secondary">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageDeliverMenStatus;
