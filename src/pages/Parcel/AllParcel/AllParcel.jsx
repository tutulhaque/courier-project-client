import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { useState } from "react";
import { useEffect } from "react";
import ManageButtonModal from "../../Dashboard/Modal/ManageButtonModal";

const AllParcel = () => {
    const [parcels, setParcels] = useState([]);
    const [selectedParcel, setSelectedParcel] = useState(null);
    const [initialParcels, setInitialParcels] = useState([]);
    const { user } = useContext(AuthContext);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    console.log(startDate,endDate)


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

    useEffect(() => {
        setInitialParcels(parcels); // Store initial data when parcels change
    }, [parcels]);


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

    const filterParcels = () => {
        const formattedStartDate = startDate ? new Date(startDate).toISOString() : '';
        const formattedEndDate = endDate ? new Date(endDate).toISOString() : '';

        const filteredData = initialParcels.filter((item) => {
            const requestedDate = new Date(item.requestedDate);

            return (
                (!formattedStartDate || requestedDate >= new Date(formattedStartDate)) &&
                (!formattedEndDate || requestedDate <= new Date(formattedEndDate))
            );
        });

        setParcels(filteredData);
    };

    useEffect(() => {
        filterParcels(); // Apply filtering when start/end date change
    }, [startDate, endDate]);
    
    
    

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
                <div className="flex">
                    <input
                        className="input input-bordered w-1/2"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <input
                        className="input input-bordered w-1/2"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                    {/* <button className="btn btn-neutral" onClick={handleSearch}></button> */}
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