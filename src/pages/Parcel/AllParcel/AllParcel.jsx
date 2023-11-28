import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { useState } from "react";
import { useEffect } from "react";
import ManageButtonModal from "../../Dashboard/Modal/ManageButtonModal";

const AllParcel = () => {
    const [parcels, setParcels] = useState([]);
    const [selectedParcel, setSelectedParcel] = useState(null);
    const { user } = useContext(AuthContext);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');


    useEffect(() => {
        const email = user ? user.email : '';
        if (email) {
            fetch(`http://localhost:5000/parcels`)
                .then((response) => response.json())
                .then((data) => {
                    setParcels(data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [user]);

    const handleSearch = () => {
        const formattedStartDate = startDate ? new Date(startDate).toISOString() : '';
        const formattedEndDate = endDate ? new Date(endDate).toISOString() : '';
        
        console.log('Formatted Start Date:', formattedStartDate);
        console.log('Formatted End Date:', formattedEndDate);
        
        fetch(`http://localhost:5000/parcels?startDate=${formattedStartDate}&endDate=${formattedEndDate}`)
            .then((response) => response.json())
            .then((data) => {
                setParcels(data);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    
    
    

    // 
    const openModal = (parcel) => {
        setSelectedParcel(parcel); 
    };

    const closeModal = () => {
        setSelectedParcel(null); 
    };

    return (
        <div className="max-w-7xl mx-auto p-10 bg-[#f7f7f7]">
            <div>
                <h1 className="text-4xl font-extrabold py-10">All Booked Parcel</h1>
                <div>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User’s Name</th>
                            <th>User’s Phone</th>
                            <th>Booking Date</th>
                            <th>Requested Delivery Date</th>
                            <th>Cost</th>
                            <th>Booking Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {

                            parcels.map((item, i) =>
                                <tr key={item?._id}>
                                    <td>{i + 1}</td>
                                    <td>{item?.userName}</td>
                                    <td>{item?.number}</td>
                                    <td>{item?.bookingDate}</td>
                                    <td>{item?.requestedDate}</td>
                                    <td>{item?.price}</td>
                                    <td>{item?.status}</td>
                                    {/* <td>
                                        <button onClick={() => handleDelete(item?._id)} className="btn btn-ghost btn-xs text-red-500">X</button>
                                    </td> */}
                                    <td>
                                        {/* Manage button to open modal */}
                                        <button onClick={() => openModal(item)} className="btn btn-sm">
                                            Manage
                                        </button>
                                    </td>
                                </tr>
                            )
                        }
                        <p>{parcels.length === 0 ? <p className="text-2xl mt-3">Your Parcel is Empty</p> : ''}</p>

                    </tbody>
                    {/* foot */}
                </table>
            </div>
            {/* Modal for managing parcel */}
            {selectedParcel && (
                <ManageButtonModal
                    selectedParcel={selectedParcel}
                    closeModal={closeModal}
                />
            )}
        </div>
    );
};

export default AllParcel;