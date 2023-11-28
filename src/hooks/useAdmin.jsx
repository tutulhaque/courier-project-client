import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useAdmin = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    
    const { data, isPending } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/roles/${user.email}`);
            return res.data?.isAdmin;
        }
    });

    return [data, isPending];
};

export default useAdmin;