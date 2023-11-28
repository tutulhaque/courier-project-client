import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useEffect } from "react";

const UpdateParcel = () => {
    const { user } = useContext(AuthContext);
    const today = new Date();
    const navigate = useNavigate();
    const [parcelData, setParcelData] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        // Fetch the existing parcel data based on the ID when the component mounts
        fetch(`http://localhost:5000/parcel/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setParcelData(data); // Update the state with the fetched parcel data
            })
            .catch((error) => {
                console.error(error);
                // Handle error, e.g., show an error message
            });
    }, [id]);

    const handleUpdateProduct = event => {
        event.preventDefault();
        const form = event.target;
        const number = form.number.value;
        const type = form.type.value;
        const weight = form.weight.value;
        const receiversName = form.receiversName.value;
        const receiversNumber = form.receiversNumber.value;
        const requestedDate = form.requestedDate.value;
        const deliveryAddress = form.deliveryAddress.value;
        const latitude = form.longitude.value;
        const longitude = form.longitude.value;
        const price = form.price.value;
        const updatedProduct = { userName: user.displayName, email: user.email, number, type, weight, receiversName, bookingDate: today.toISOString().split('T')[0], requestedDate, receiversNumber, deliveryAddress, latitude, longitude, price }
        fetch(`http://localhost:5000/parcel/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedProduct)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Product Updated Successfully.',
                        icon: 'success',
                        confirmButtonText: 'Close'
                    })
                    navigate('/');
                }

            })

    }

    const [price, setPrice] = useState(0);

    const calculatePrice = (weight) => {
        let calculatedPrice = 0;
        if (weight === 1) {
            calculatedPrice = 50;
        } else if (weight === 2) {
            calculatedPrice = 100;
        } else if (weight > 2) {
            calculatedPrice = 150;
        }
        setPrice(calculatedPrice);
    };

    const handleParcelWeightChange = (event) => {
        const weight = parseInt(event.target.value);
        calculatePrice(weight);
    };

    return (
        <div className="my-10">
            <Helmet>
                <title>Add Parcel</title>
            </Helmet>
            <div className="max-w-7xl mx-auto bg-[#f7f7f7] p-10">
                <h1 className="text-4xl font-extrabold">Add Parcel</h1>
                <form onSubmit={handleUpdateProduct}>
                    {/* Row-01 */}
                    <div className="flex gap-3 my-3">
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Parcel Name</span>
                            </label>
                            <label className="input-group">
                                <input readOnly defaultValue={user.displayName} required type="text" name="name" className="input input-bordered w-full" />
                            </label>
                        </div>
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <label className="input-group">
                                <input readOnly required type="text" defaultValue={user.email} name="email" className="input input-bordered w-full" />
                            </label>
                        </div>
                    </div>
                    <div className="flex gap-3 my-3">
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Phone Number</span>
                            </label>
                            <label className="input-group">
                                <input defaultValue={parcelData.number} required type="text" name="number" className="input input-bordered w-full" />
                            </label>
                        </div>
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Parcel Type</span>
                            </label>
                            <label className="input-group">
                                <input required type="text" defaultValue={parcelData.type} name="type" className="input input-bordered w-full" />
                            </label>
                        </div>
                    </div>
                    <div className="flex gap-3 my-3">
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Parcel Weight</span>
                            </label>
                            <label className="input-group">
                                <input required type="number" defaultValue={parcelData.weight} name="weight" onChange={handleParcelWeightChange} className="input input-bordered w-full" />
                            </label>
                        </div>

                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Receivers Name</span>
                            </label>
                            <label className="input-group">
                                <input defaultValue={parcelData.receiversName} required type="text" name="receiversName" className="input input-bordered w-full" />
                            </label>
                        </div>
                    </div>
                    <div className="flex gap-3 my-3">
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Receivers Number</span>
                            </label>
                            <label className="input-group">
                                <input defaultValue={parcelData.receiversNumber} required type="text" name="receiversNumber" className="input input-bordered w-full" />
                            </label>
                        </div>

                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Parcel Delivery Address</span>
                            </label>
                            <label className="input-group">
                                <input defaultValue={parcelData.deliveryAddress} required type="text" name="deliveryAddress" className="input input-bordered w-full" />
                            </label>
                        </div>
                    </div>

                    <div className="flex gap-3 my-3">
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Requested Delivery Date</span>
                            </label>
                            <label className="input-group">
                                <input defaultValue={parcelData.requestedDate} required type="date" name="requestedDate" className="input input-bordered w-full" />
                            </label>
                        </div>

                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Delivery Address Latitude</span>
                            </label>
                            <label className="input-group">
                                <input defaultValue={parcelData.latitude} required type="text" name="latitude" className="input input-bordered w-full" />
                            </label>
                        </div>
                    </div>

                    <div className="flex gap-3 my-3">
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Delivery Address Longitude</span>
                            </label>
                            <label className="input-group">
                                <input defaultValue={parcelData.longitude} required type="text" name="longitude" className="input input-bordered w-full" />
                            </label>
                        </div>

                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Parcel Price</span>
                            </label>
                            <label className="input-group">
                                <input defaultValue={parcelData.price} required type="text" name="price" value={`${price}`} className="input input-bordered w-full" readOnly />
                            </label>
                        </div>


                    </div>
                    <div className="flex justify-center">
                        <input type="submit" value="update Parcel" className="btn btn-neutral" />
                    </div>
                </form>
            </div>

        </div>
    );
};

export default UpdateParcel;