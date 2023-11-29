import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTruckPickup, FaUserCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState } from "react";
import Pagination from "../Pagination/Pagination";


const AllUsers = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

    // Calculate pagination indices
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;

    // Slice the users based on pagination indices
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleMakeUser = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is an Admin Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }
    const handleMakeDeliverMen = user => {
        axiosSecure.patch(`/users/deliveryMen/${user._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is an Deliver Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    const handleDeleteUser = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <div>
            <div className="flex my-4">
                <h2 className="text-3xl">Total Users: {users.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentUsers.map((user, index) => <tr key={user._id}>
                                <th>{(currentPage - 1) * usersPerPage + index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.role === 'admin' || user.role === 'deliverMen' ? user.role : <>
                                        <button
                                            onClick={() => handleMakeUser(user)}
                                            className="btn btn-lg bg-red-500">
                                            <FaUserCircle className="text-white 
                                        text-2xl"></FaUserCircle>
                                        </button>
                                        <button
                                            onClick={() => handleMakeDeliverMen(user)}
                                            className="btn btn-lg bg-red-500">
                                            <FaTruckPickup className="text-white 
                                        text-2xl"></FaTruckPickup>
                                        </button>

                                    </>}

                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDeleteUser(user)}
                                        className="btn btn-ghost btn-lg">
                                        <p className="text-red-600">X</p>
                                    </button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
                <Pagination
                    totalUsers={users.length}
                    usersPerPage={usersPerPage}
                    currentPage={currentPage}
                    paginate={paginate}
                />
            </div>

        </div>
    );
};

export default AllUsers;