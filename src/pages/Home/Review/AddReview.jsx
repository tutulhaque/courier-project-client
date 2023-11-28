import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

// ManageButtonModal.jsx
const AddReview = ({ selectedParcel, closeModal }) => {

    const { user } = useContext(AuthContext);
    console.log(selectedParcel);

    const handleReview = event => {
        event.preventDefault();
        const form = event.target;
        const description = form.description.value;
        const review = form.review.value;
        const newParcel = {userName: user.displayName, email: user.email, description,review,parcelId:selectedParcel._id,selectedDeliveryMen:selectedParcel.selectedDeliveryMen}
        console.log(newParcel);
        fetch('http://localhost:5000/userReviews', {
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
                    Navigate('/dashboard/my-parcel');
                }

            })
    }
    

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
                <div className="fixed inset-0 bg-black opacity-50"></div>
                <div className="modal-container bg-white w-[800px] mx-auto rounded shadow-lg z-50 p-6">
                    <h2 className="text-xl font-semibold mb-4">Review</h2>
                    <div className="max-w-7xl mx-auto bg-[#f7f7f7] p-10">
                        <h1 className="text-4xl font-extrabold">Add Review</h1>
                        <form onSubmit={handleReview}>

                            {/* Row-02 */}
                            <div className="flex gap-3 my-3">
                                <div className="form-control w-1/2">
                                    <label className="label">
                                        <span className="label-text">Description</span>
                                    </label>
                                    <label className="input-group">
                                        <input required type="text" name="description" className="input input-bordered w-full" />
                                    </label>
                                </div>
                                <div className="form-control w-1/2">
                                    <label className="label">
                                        <span className="label-text">Review</span>
                                    </label>
                                    <label className="input-group">
                                        <input required type="number" name="review" className="input input-bordered w-full" />
                                    </label>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <input type="submit" value="Submit" className="btn btn-neutral" />
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

export default AddReview;
