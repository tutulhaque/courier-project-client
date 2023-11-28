import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useDeliverMen = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    
    const { data, isPending } = useQuery({
        queryKey: [user?.email, 'isDeliverMen'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/roles/${user.email}`);
            return res.data?.isDeliverMen;
        }
    });

    return [data, isPending];
};

export default useDeliverMen;
