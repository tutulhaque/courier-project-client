import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { Helmet } from "react-helmet-async";
import { useState } from "react";

const AddParcel = () => {
    const { user } = useContext(AuthContext);
    const today = new Date();
    const navigate = useNavigate();
    const handleAddParcel = event => {
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
        const newParcel = {userName: user.displayName, email: user.email, number,type,weight,receiversName,bookingDate:today.toISOString().split('T')[0],requestedDate,receiversNumber,deliveryAddress,latitude,longitude,price,status:'pending'}
        console.log(newParcel);
        fetch('http://localhost:5000/parcels', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newParcel)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Parcel Added Successfully.',
                        icon: 'success',
                        confirmButtonText: 'Close'
                    })
                    navigate('/dashboard/my-parcel');
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
                <form onSubmit={handleAddParcel}>
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
                                <input required type="text" name="number" className="input input-bordered w-full" />
                            </label>
                        </div>
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Parcel Type</span>
                            </label>
                            <label className="input-group">
                                <input required type="text" name="type" className="input input-bordered w-full" />
                            </label>
                        </div>
                    </div>
                    <div className="flex gap-3 my-3">
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Parcel Weight</span>
                            </label>
                            <label className="input-group">
                                <input required  type="number" name="weight" onChange={handleParcelWeightChange} className="input input-bordered w-full" />
                            </label>
                        </div>

                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Receivers Name</span>
                            </label>
                            <label className="input-group">
                                <input required type="text" name="receiversName" className="input input-bordered w-full" />
                            </label>
                        </div>
                    </div>
                    <div className="flex gap-3 my-3">
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Receivers Number</span>
                            </label>
                            <label className="input-group">
                                <input required type="text" name="receiversNumber" className="input input-bordered w-full" />
                            </label>
                        </div>

                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Parcel Delivery Address</span>
                            </label>
                            <label className="input-group">
                                <input required type="text" name="deliveryAddress" className="input input-bordered w-full" />
                            </label>
                        </div>
                    </div>

                    <div className="flex gap-3 my-3">
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Requested Delivery Date</span>
                            </label>
                            <label className="input-group">
                                <input required type="date" name="requestedDate" className="input input-bordered w-full" />
                            </label>
                        </div>

                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Delivery Address Latitude</span>
                            </label>
                            <label className="input-group">
                                <input required type="text" name="latitude" className="input input-bordered w-full" />
                            </label>
                        </div>
                    </div>

                    <div className="flex gap-3 my-3">
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Delivery Address Longitude</span>
                            </label>
                            <label className="input-group">
                                <input required type="text" name="longitude" className="input input-bordered w-full" />
                            </label>
                        </div>

                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Parcel Price</span>
                            </label>
                            <label className="input-group">
                            <input required type="text" name="price" value={`${price}`} className="input input-bordered w-full" readOnly />
                            </label>
                        </div>

                      
                    </div>
                    {/* Row-02 */}
                    {/* <div className="flex gap-3 my-3">
                    <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Parcel Category</span>
                            </label>
                            <select name="category" className="select w-full">
                                <option disabled selected>Your favorite Parcel category</option>
                                <option value="Italian Cuisine">Italian Cuisine</option>
                                <option value="Mexican Cuisine">Mexican Cuisine</option>
                                <option value="Sushi">Sushi</option>
                                <option value="Indian Cuisine">Indian Cuisine</option>
                                <option value="Mediterranean Cuisine">Mediterranean Cuisine</option>
                                <option value="SeaParcel">SeaParcel</option>
                            </select>
                        </div>
                    </div> */}
                    <div className="flex justify-center">
                        <input type="submit" value="Add Parcel" className="btn btn-neutral" />
                    </div>
                </form>
            </div>

        </div>
    );
};

export default AddParcel;