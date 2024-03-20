// import { useEffect, useState } from "react";
// import useConversation from "../zustand/useConversation";
// import toast from "react-hot-toast";

// const useGetMessages = () => {
//   const [loading, setLoading] = useState(false);
//   const { messages, setMessages } = useConversation();

//   useEffect(() => {
//     const getMessages = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch("/messages/65eebd28b3b0e68bd87e5bb0");
//         const data = await res.json();
//         if (data.error) throw new Error(data.error);
//         setMessages(data);
//       } catch (error) {
//         toast.error(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if ("65eebd28b3b0e68bd87e5bb0") getMessages();
//   }, // eslint-disable-next-line
//   ["65eebd28b3b0e68bd87e5bb0", setMessages]);

//   return { messages, loading };
// };
// export default useGetMessages;



import { useEffect, useState, useMemo } from "react";
import toast from "react-hot-toast";
import Cookies from 'js-cookie'
import { getMessages } from "../../../Services/ApiMesaage";
import useConversation from "../zustand/useConversation"; 

const useGetMessages = () => {
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

    useEffect(() => {
        const fetchMessages = async () => {
            setLoading(true);
            try {
                const res = await getMessages(selectedConversation?._id, config); // Pass selectedConversation._id and config
                setMessages(res.data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (selectedConversation?._id) {
            fetchMessages();
        }
    }, [config, selectedConversation, setMessages]); // Include selectedConversation and setMessages in the dependency array

    return { messages, loading };
};

export default useGetMessages;
