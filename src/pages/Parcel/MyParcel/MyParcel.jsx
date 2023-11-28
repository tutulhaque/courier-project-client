import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";
import AddReview from "../../Home/Review/AddReview";
import { Link } from "react-router-dom";

const MyParcel = () => {
    const [cartItems, setCartItems] = useState([]);
    const [selectedParcel, setSelectedParcel] = useState(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const email = user ? user.email : ''; // Set email to an empty string if user is not logged in
        if (email) {
            // Fetch cart items for the logged-in user based on their email
            // Make a GET request to your server's API endpoint that fetches the user's cart items
            fetch(`http://localhost:5000/parcel-by-email?email=${email}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    setCartItems(data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [user]);


    // Modal
    const openModal = (parcel) => {
        setSelectedParcel(parcel); // Set the selected parcel when "Manage" is clicked
    };

    const closeModal = () => {
        setSelectedParcel(null); // Reset selected parcel to close the modal
    };


    return (
        <div className="max-w-7xl mx-auto my-10 p-20 bg-[#f7f7f7]">
            <h1 className="text-4xl font-extrabold py-10">My Parcel</h1>
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
                                        <button onClick="" className="btn btn-ghost btn-xs text-red-500">X</button>
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
