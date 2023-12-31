import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { FaBell } from 'react-icons/fa';
import mainLogo from '../../../assets/logo-main.png';
const NavBar = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }

    const navLinks = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
        <li><NavLink to="/notification"><FaBell></FaBell></NavLink></li>

        {/* <li>
            <NavLink to="/dashboard/cart">
                <button className="btn">
                    <FaShoppingCart className="mr-2"></FaShoppingCart>
                    <div className="badge badge-secondary">+{cart.length}</div>
                </button>
            </NavLink>
        </li> */}
        {
            // user ? <>
            //     {/* <span>{user?.displayName}</span> */}
            //     <button onClick={handleLogOut} className="btn btn-ghost">LogOut</button>
            // </> : <>
            //     <li><NavLink to="/login">Login</NavLink></li>
            // </>
        }
    </>

    return (
        <>
            <div className="navbar bg-base-100 max-w-7xl mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navLinks}
                        </ul>
                    </div>
                    <Link to="/"><img className="w-40" src={mainLogo} alt="" /></Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navLinks}
                    </ul>
                </div>

                <div className="navbar-end bg-base-100">
                    <div className="flex-none gap-2">
                       {user? (<>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img alt="Tailwind CSS Navbar component" src={user.photoURL} />
                                </div>
                            </div>
                            <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                               
                                <li className="disabled">
                                    <p className="text-xl font-bold">{user.displayName}</p>
                                </li>
                                <Link to='/dashboard'><li><a>Dashboard</a></li></Link>
                                <Link onClick={handleLogOut}><li><a>Logout</a></li></Link>
                            </ul>
                        </div>
                       </>)
                       
                       
                       :(<> <Link to="/login">
                       <button className="btn btn-sm">Log In</button>
                   </Link></>)}
                    </div>
                </div>
            </div>
        </>
    );
};

export default NavBar;