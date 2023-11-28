import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../providers/AuthProvider";

const ReviewList = () => {
    const [reviewItems, setReviewItems] = useState([]);
    const { user } = useContext(AuthContext);
    const reviewPersonEmail = user ? user.email : ''; // Assuming user contains the delivery person's details

    useEffect(() => {
        if (reviewPersonEmail) {
            fetch(`http://localhost:5000/review-by-delivery-men?email=${reviewPersonEmail}`)
                .then((response) => response.json())
                .then((data) => {
                    setReviewItems(data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [reviewPersonEmail]);
    console.log(reviewItems);

    return (
        <div className="max-w-7xl mx-auto my-10 p-20 bg-[#f7f7f7]">
            <h1 className="text-4xl font-extrabold py-10">My Delivery List</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>User Review ID</th>
                            <th>Review Description</th>
                            <th>Review</th>
                            {/* <th>Action</th>
                            <th></th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            reviewItems
                                .map(item =>
                                    <tr key={item?._id}>
                                        <td>{item?._id}</td>
                                        <td>{item?.description && item.description.split(' ').slice(0, 30).join(' ')}...</td>
                                        <td>{item?.review}-Star</td>
                                    </tr>
                                )
                        }
                        <p>{reviewItems.length === 0 ? <p className="text-2xl mt-3">No Review Available</p> : ''}</p>

                    </tbody>
                    {/* foot */}
                </table>
            </div>
        </div>
    );
};

export default ReviewList;
