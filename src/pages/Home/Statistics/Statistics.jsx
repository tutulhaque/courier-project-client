import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import CountUp from 'react-countup';

const Statistics = () => {
    const [parcels, setParcels] = useState([]);
    const { user } = useContext(AuthContext);

    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })
    
    useEffect(() => {
            // Fetch cart items for the logged-in user based on their email
            // Make a GET request to your server's API endpoint that fetches the user's cart items
            fetch(`http://localhost:5000/parcels`)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    setParcels(data);
                })
                .catch((error) => {
                    console.error(error);
                });
       
    }, [user]);
    const deliveredDataLength = parcels.filter(item => item.status === 'onTheWay').length;
    return (
        <div className="flex justify-center">
            <div className="stats shadow">

                <div className="stat">
                    <div className="stat-figure text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                    </div>
                    <div className="stat-title text-2xl font-bold">Parcel Booked</div>
                    <div className="stat-value text-primary"><CountUp start={0} end={parcels.length} /></div>
                    <div className="stat-desc text-lg">21% more than last month</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </div>
                    <div className="stat-title text-2xl font-bold">Parcel Delivered</div>
                    <div className="stat-value text-secondary"><CountUp start={0} end={deliveredDataLength} /></div>
                    <div className="stat-desc text-lg">12% more than last month</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <div className="avatar online">
                            <div className="w-16 rounded-full">
                                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                    </div>
                    <div className="stat-value"><p className="text-4xl"><CountUp delay={2} start={0} end={users?.length} /></p></div>
                    <div className="stat-title text-2xl font-bold">Registered App Users</div>
                    <div className="stat-desc text-secondary text-lg">5 New users</div>
                </div>

            </div>
        </div>
    );
};

export default Statistics;