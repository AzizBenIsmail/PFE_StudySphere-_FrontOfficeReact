import { useEffect, useState , useMemo} from "react";
import toast from "react-hot-toast";
import Cookies from 'js-cookie'
import { getUsersForSidebar } from "Services/ApiUser";

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);
    const jwt_token = Cookies.get("jwt_token");

    if (!jwt_token) {
        window.location.replace("/login-page");
    }

    const config = useMemo(() => {
        return {
            headers: {
                Authorization: `Bearer ${jwt_token}`,
            },
        };
    }, [jwt_token]);

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                const res = await getUsersForSidebar(config);
                setConversations(res.data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        getConversations();

        const interval = setInterval(() => {
            getConversations(); // appel répété toutes les 10 secondes
        }, 300000);

        return () => clearInterval(interval); // nettoyage à la fin du cycle de vie du composant
    }, [config]);

    return { loading, conversations };
};

export default useGetConversations;
