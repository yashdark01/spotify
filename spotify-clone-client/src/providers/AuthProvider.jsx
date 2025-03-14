import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState, useRef } from "react";
import { axiosInstance } from "../lib/axios";
import { Loader } from "lucide-react";
import { useDispatch } from "react-redux";
import { checkAdminStatus } from "@/redux/authSlice";

const updateApiToken = (token) => {
    if (token) {
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axiosInstance.defaults.headers.common["Authorization"];
    }
};

const AuthProvider = ({ children }) => {
    const { getToken, session } = useAuth();
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const tokenRefreshTimeout = useRef(null); // Store timeout in useRef

    useEffect(() => {
        const initAuth = async () => {
            try {
                const token = await getToken();
                console.log("Token:", token);
                updateApiToken(token);

                if (token) {
                    dispatch(checkAdminStatus());
                }

                // Set up token refresh logic
                if (session?.expiresAt) {
                    const expiresAt = new Date(session.expiresAt).getTime();
                    const currentTime = Date.now();
                    const refreshTime = expiresAt - currentTime - 60000; // 1 min before expiry

                    if (refreshTime > 0) {
                        tokenRefreshTimeout.current = setTimeout(initAuth, refreshTime);
                    }
                }
            } catch (error) {
                updateApiToken(null);
                console.error("Error fetching token:", error);
            } finally {
                setLoading(false);
            }
        };

        initAuth();

        return () => {
            if (tokenRefreshTimeout.current) {
                clearTimeout(tokenRefreshTimeout.current);
            }
        };
    }, [getToken, session, dispatch]);

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center">
                <Loader className="size-6 text-emerald-700 animate-spin" />
            </div>
        );
    }

    return <>{children}</>;
};

export default AuthProvider;