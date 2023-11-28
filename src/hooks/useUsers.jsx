import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUsers = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    
    const { data, isPending } = useQuery({
        queryKey: [user?.email, 'isUser'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/roles/${user.email}`);
            return res.data?.isUser;
        }
    });

    return [data, isPending];
};

export default useUsers;
