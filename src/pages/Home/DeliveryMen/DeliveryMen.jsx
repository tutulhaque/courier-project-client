import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const DeliveryMen = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })
    const deliveryMen = users.filter(item => item.role === 'deliverMen');
    const popularFiveDeliveryMen = deliveryMen.slice(2, 7);
    const sortedDeliveryMen = popularFiveDeliveryMen.sort((a, b) => b.count - a.count);
    return (
        <div className="max-w-7xl mx-auto mt-20">
        <h1 className="text-5xl font-bold text-center">Our Best Heroes</h1>
        <div className="py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* 01 */}
            {
                
                sortedDeliveryMen.map(user => <div key={user?._id} className="relative flex flex-col text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border">
                <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white shadow-lg h-80 rounded-xl bg-clip-border">
                    <img src={user?.photoURL} alt="profile-picture" />
                </div>
                <div className="p-6 text-center">
                    <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                        {user?.name}
                    </h4>
                    <h4 className="block mb-2 font-sans text-xl text-red antialiased font-semibold leading-snug tracking-normal text-red-600">
                    Parcel Delivered- {user?.count}
                    </h4>
                    <h4 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-600">
                    Reviews- {user?.reviews ? user.reviews: 0}
                    </h4>
                    <p className="block font-sans text-base antialiased font-medium leading-relaxed text-transparent bg-gradient-to-tr from-pink-600 to-pink-400 bg-clip-text">
                        DeliverStaff / Ph-Courier
                    </p>
                </div>
               
            </div>)

            }
            
            {/* 01 */}
        </div>
    </div>
    );
};

export default DeliveryMen;