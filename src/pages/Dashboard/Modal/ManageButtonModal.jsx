import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";

// ManageButtonModal.jsx
const ManageButtonModal = ({ selectedParcel, closeModal }) => {
    const queryClient = useQueryClient();

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
        const approximateDeliveryDate = form.approximateDeliveryDate.value;
        const selectedDeliveryMen =  form.selectedDeliveryMen.value;
        
        const updatedProduct = { approximateDeliveryDate,selectedDeliveryMen,status:'onTheWay'}
        console.log(updatedProduct)
        fetch(`http://localhost:5000/parcels/${selectedParcel._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedProduct)
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
                                        <span className="label-text">Approximate delivery date</span>
                                    </label>
                                    <label className="input-group">
                                        <input required type="date" name="approximateDeliveryDate" className="input input-bordered w-full" />
                                    </label>
                                </div>
                                <div className="form-control w-1/2">
                                    <label className="label">
                                        <span className="label-text">Select A Delivery Man</span>
                                    </label>
                                    <select name="selectedDeliveryMen" className="select w-full">
                                        {
                                            users
                                                .filter(user => user.role === 'deliverMen')
                                                .map((user) => <><option value={user.email}>{user.name}</option></>)
                                        }
                                        
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

export default ManageButtonModal;
