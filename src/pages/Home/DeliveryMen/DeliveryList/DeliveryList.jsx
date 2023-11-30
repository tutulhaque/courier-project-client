import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../providers/AuthProvider";
import ManageDeliverMenStatus from "../../../Dashboard/Modal/ManageDeliverMenStatus";

const DeliveryList = () => {
    const [deliveryItems, setDeliveryItems] = useState([]);
    // const [parcels, setParcels] = useState([]);
    const [selectedParcel, setSelectedParcel] = useState(null);
    const { user } = useContext(AuthContext);
    const deliveryPersonEmail = user ? user.email : ''; // Assuming user contains the delivery person's details

    useEffect(() => {
        if (deliveryPersonEmail) {
            fetch(`http://localhost:5000/parcel-by-delivery-men?email=${deliveryPersonEmail}`)
                .then((response) => response.json())
                .then((data) => {
                    setDeliveryItems(data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [deliveryPersonEmail]);


    const handleDelete = (_id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/add-to-cart/${_id}`, {
                    method: "DELETE",

                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            console.log("deleted");
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                            const remaining = deliveryItems.filter(item => item._id !== _id);
                            setDeliveryItems(remaining);

                        }
                    })
            }
        })

    }
    // 
    const openModal = (parcel) => {
        setSelectedParcel(parcel); // Set the selected parcel when "Manage" is clicked
    };

    const closeModal = () => {
        setSelectedParcel(null); // Reset selected parcel to close the modal
        window.location.reload();
    };

    return (
        <div className="max-w-7xl mx-auto my-10 p-20 bg-[#f7f7f7]">
            <h1 className="text-4xl font-extrabold py-10">My Delivery List</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Delivery Men ID</th>
                            <th>Booked User’s Name</th>
                            <th>Receivers Name</th>
                            <th>Booked User’s Phone</th>
                            <th>Requested Delivery Date</th>
                            <th>Approximate Delivery Date</th>
                            <th>Receivers phone number</th>
                            <th>Receivers Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            deliveryItems
                                .filter(item => (item.status === 'onTheWay' || item.status === 'delivered') && item.selectedDeliveryMen === user.email) // Filter by 'onTheWay' status and selected delivery men
                                .map(item =>
                                    <tr key={item?._id}>
                                        <td>{item?._id}</td>
                                        <td>{item?.userName}</td>
                                        <td>{item?.receiversName}</td>
                                        <td>{item?.number}</td>
                                        <td>{item?.requestedDate}</td>
                                        <td>{item?.approximateDeliveryDate}</td>
                                        <td>{item?.receiversNumber}</td>
                                        <td>{item?.deliveryAddress}</td>
                                        <td>
                                            <button
                                                onClick={() => openModal(item)}
                                                className="btn btn-sm"
                                                disabled={item?.status === 'delivered'}
                                            >
                                                {item?.status}
                                            </button>
                                        </td>
                                    </tr>
                                )
                        }
                        <p>{deliveryItems.length === 0 ? <p className="text-2xl mt-3">Your Parcel is Empty</p> : ''}</p>

                    </tbody>
                    {/* foot */}
                </table>
            </div>
            {/* Modal for managing parcel */}
            {selectedParcel && (
                <ManageDeliverMenStatus
                    selectedParcel={selectedParcel}
                    closeModal={closeModal}
                />
            )}
        </div>
    );
};

export default DeliveryList;
