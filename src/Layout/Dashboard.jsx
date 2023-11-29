import { FaBook, FaCalendar, FaHome, FaList, FaUsers, FaUtensils } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useDeliverMen from "../hooks/useDeliverMen";
import useUsers from "../hooks/useUsers";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";


const Dashboard = () => {
    const { user } = useContext(AuthContext);

    // TODO: get isAdmin value from the database
    const [isAdmin] = useAdmin();
    const [isDeliverMen] = useDeliverMen();
    const [isUser] = useUsers();

    return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-red-400">

                <div className="ml-5 flex gap-3 items-center">
                    <img className="w-10 rounded-full" alt="Tailwind CSS Navbar component" src={user.photoURL} />
                    <p className="text-white">{user.displayName}</p>
                </div>

                <ul className="menu p-4">
                    {
                        isUser && <>
                            <li>
                                <NavLink to="/dashboard/add-parcel">
                                    <FaUtensils></FaUtensils>
                                    Book A Parcel</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/my-parcel">
                                    <FaList></FaList>
                                    My Parcel</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/my-profile">
                                    <FaBook></FaBook>
                                    My Profile</NavLink>
                            </li>
                        </>
                    }
                    {isDeliverMen &&
                        <>
                            <li>
                                <NavLink to="/dashboard/deliverList">
                                    <FaHome></FaHome>
                                    My Delivery List</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/myReview">
                                    <FaCalendar></FaCalendar>
                                    My Reviews Menu</NavLink>
                            </li>
                        </>
                    }
                    {
                        isAdmin &&
                        <>
                            <li>
                                <NavLink to="/dashboard/all-parcels">
                                    <FaUsers></FaUsers>
                                    All Parcels</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/users">
                                    <FaUsers></FaUsers>
                                    All Users</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/allDeliverMen">
                                    <FaUsers></FaUsers>
                                    All Delivery Men</NavLink>
                            </li>

                        </>
                    }

                    {/* shared nav links */}
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/">
                            <FaHome></FaHome>
                            Return To Home</NavLink>
                    </li>

                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;