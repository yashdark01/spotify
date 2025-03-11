import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { Loader } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { checkAdminStatus } from "@/redux/authSlice";

const updateApiToken = (token) => {
    if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axiosInstance.defaults.headers.common['Authorization'];
    }
}

const AuthProvider = ({ children }) => {
    const { getToken } = useAuth();
    const [loading, setLoading] = useState(true);
    // const {admin} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const initAuth = async () => {
            try {
                const token = await getToken();
                updateApiToken(token);
                if(token){
                    dispatch(checkAdminStatus());
                }
            } catch (error) {
                updateApiToken(null);
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, [getToken]);

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center">
                <Loader className="size-6 text-emerald-700 animate-spin" />
            </div>
        );
    }
    return <div>{children}</div>;
};

export default AuthProvider;

