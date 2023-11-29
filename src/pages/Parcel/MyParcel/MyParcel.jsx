import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";
import AddReview from "../../Home/Review/AddReview";
import { Link } from "react-router-dom";

const MyParcel = () => {
    const { user } = useContext(AuthContext);
    const [cartItems, setCartItems] = useState([]);
    const [selectedParcel, setSelectedParcel] = useState(null);
    const [filterStatus, setFilterStatus] = useState('');
    const [originalCartItems, setOriginalCartItems] = useState([]);

    useEffect(() => {
        const email = user ? user.email : '';
        if (email) {
            fetch(`http://localhost:5000/parcel-by-email?email=${email}`)
                .then((response) => response.json())
                .then((data) => {
                    setOriginalCartItems(data);
                    setCartItems(data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [user]);

    const filterByStatus = (status) => {
        if (status === '') {
            setCartItems(originalCartItems);
        } else {
            const filteredData = originalCartItems.filter((item) => item.status === status);
            setCartItems(filteredData);
        }
    };

    useEffect(() => {
        filterByStatus(filterStatus);
    }, [filterStatus, originalCartItems]);


    // Modal
    const openModal = (parcel) => {
        setSelectedParcel(parcel);
    };

    const closeModal = () => {
        setSelectedParcel(null);
    };

    const handleCancel = (id) => {
        const parcelToCancel = cartItems.find(item => item._id === id);

        if (parcelToCancel.status === 'pending') {
            Swal.fire({
                title: 'Are you sure you want to cancel this booking?',
                text: 'This action cannot be undone!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, cancel it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch(`http://localhost:5000/parcel/cancel/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(parcelToCancel)
                    })
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.modifiedCount === 1) {
                            const updatedItems = cartItems.map(item =>
                                item._id === id ? { ...item, status: 'cancel' } : item
                            );
                            setCartItems(updatedItems);
                            Swal.fire('Cancelled!', 'Your booking has been cancelled.', 'success');
                        } else {
                            Swal.fire('Error!', 'Failed to cancel the booking.', 'error');
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                        Swal.fire('Error!', 'Failed to cancel the booking.', 'error');
                    });
                }
            });
        } else {
            Swal.fire('Unable to Cancel', 'Only Pending booking Status Can be Cancel.', 'error');
        }
    };


    return (
        <div className="max-w-7xl mx-auto my-10 p-20 bg-[#f7f7f7]">
            <h1 className="text-4xl font-extrabold py-10">My Parcel</h1>
            {/* Filter by status */}
            <div className="mb-4">
                <label htmlFor="statusFilter" className="mr-2">Filter by Status:</label>
                <select
                    id="statusFilter"
                    className="border rounded py-1 px-2"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                >
                    <option value="">All</option>
                    <option value="pending">Pending</option>
                    <option value="delivered">Delivered</option>
                    <option value="onTheWay">On The Way</option>
                    {/* Add other status options as needed */}
                </select>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Delivery Men ID</th>
                            <th>Parcel type</th>
                            <th>Requested Delivery Date</th>
                            <th>Approximate Delivery Date</th>
                            <th>Booking Date</th>
                            <th>Booking Status</th>
                            <th>Action</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            cartItems.map(item =>
                                <tr key={item?._id}>
                                    <td>{item?._id}</td>
                                    <td>{item?.type}</td>
                                    <td>{item?.requestedDate}</td>
                                    <td>{item?.approximateDeliveryDate}</td>
                                    <td>{item?.bookingDate}</td>
                                    <td>
                                        {item?.status === 'delivered'
                                            ? <button onClick={() => openModal(item)} className="btn btn-sm">
                                                Review
                                            </button>
                                            : item?.status}
                                    </td>

                                    <td>
                                        <button onClick={()=>handleCancel(item._id)} className="btn btn-ghost btn-xs text-red-500">Cancel</button>
                                        <Link to={`/dashboard/parcel/${item._id}`}>
                                        <button onClick="" className={`btn btn-ghost btn-xs text-red-500 ${item.status !== 'pending' && 'opacity-50 cursor-not-allowed'}`} disabled={item.status !== 'pending'}>
                                            Update
                                        </button>
                                        </Link>
                                    </td>
                                </tr>
                            )
                        }
                        <p>{cartItems.length === 0 ? <p className="text-2xl mt-3">Your Parcel is Empty</p> : ''}</p>

                    </tbody>
                    {/* foot */}
                </table>
            </div>
            {selectedParcel && (
                <AddReview
                    selectedParcel={selectedParcel}
                    closeModal={closeModal}
                />
            )}
        </div>
    );
};

export default MyParcel;
