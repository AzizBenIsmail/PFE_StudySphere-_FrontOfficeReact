import { useState, useMemo } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import Cookies from 'js-cookie'
import { sendMessage } from '../../../Services/ApiMesaage'; // Corrected import path

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();
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

    const sendMessageToApi = async (message, file) => { // Renamed sendMessage to avoid conflict
        setLoading(true);
        try {
            console.log("Message:", message);
            console.log("File:", file);
            console.log("Selected Conversation ID:", selectedConversation._id);

            const formData = new FormData();
            formData.append("message", String(message));

            if (file) {
                formData.append("file", file);
                console.log("File added to FormData:", file.name);
            }

            console.log("FormData:", formData);

            const res = await sendMessage(selectedConversation._id, formData, config); // Corrected API call
            const data = await res.data; // Assuming the response is JSON
            if (data.error) throw new Error(data.error);

            setMessages([...messages, data]);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { sendMessageToApi, loading }; // Changed return object key name
};

export default useSendMessage;
