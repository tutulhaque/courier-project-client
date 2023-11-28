import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AddParcel from "../pages/Parcel/AddParcel/AddParcel";
import MyParcel from "../pages/Parcel/MyParcel/MyParcel";
import Profile from "../pages/Profile/Profile";
import AllParcel from "../pages/Parcel/AllParcel/AllParcel";
import AllDeliveryMen from "../pages/Dashboard/AllDeliveryMen/AllDeliveryMen";
import DeliveryList from "../pages/Home/DeliveryMen/DeliveryList/DeliveryList";
import ReviewList from "../pages/Home/DeliveryMen/ReviewList/ReviewList";
import UpdateParcel from "../pages/Parcel/UpdateParcel/UpdateParcel";
import Error from "../pages/Error/Error";



  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement:<Error></Error>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        }, 
        
        {
          path: 'login',
          element: <Login></Login>
        },
        {
          path: 'signup',
          element: <SignUp></SignUp>
        }
      ]
    },
    {
      path: 'dashboard',
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children: [
        {
          path: 'add-parcel',
          element: <PrivateRoute><AddParcel></AddParcel></PrivateRoute>
        },
        {
          path: 'my-parcel',
          element: <PrivateRoute><MyParcel></MyParcel></PrivateRoute>
        },
        {
          path: "parcel/:id",
          element: <UpdateParcel></UpdateParcel>,
        },
        {
          path: 'all-parcels',
          element: <PrivateRoute><AllParcel></AllParcel></PrivateRoute>
        },
        {
          path: 'my-profile',
          element: <PrivateRoute><Profile></Profile></PrivateRoute>
        },
        // DeliverMen
        {
          path: 'deliverList',
          element: <PrivateRoute><DeliveryList></DeliveryList></PrivateRoute>
        },
        {
          path: 'myReview',
          element: <PrivateRoute><ReviewList></ReviewList></PrivateRoute>
        },

        // DeliverMen
        // admin routes
        {
          path: 'users',
          element: <PrivateRoute><AllUsers></AllUsers></PrivateRoute>
        },
        {
          path: 'allDeliverMen',
          element: <PrivateRoute><AllDeliveryMen></AllDeliveryMen></PrivateRoute>
        }

      ]
    }
  ]);