// SearchInput.js
import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = ({ onSearchChange, onConversationClick }) => {
  const [search, setSearch] = useState("");
  const [clickedConversation, setClickedConversation] = useState(null);
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();

    const conversation = conversations.find((c) =>
      c.nom.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
      setClickedConversation(conversation); // Set the clicked conversation
    } else {
      toast.error("No such user found!");
    }
  };

  const filteredConversations = conversations.filter((c) => {
    console.log("c:", c);
    console.log("search:", search);
    return (
      c.nom && search && c.nom.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleConversationSelect = (conversation) => {
    setSelectedConversation(conversation);
    setSearch("");
    setClickedConversation(conversation); // Set the clicked conversation
    onConversationClick(conversation); // Notify parent component of the clicked conversation
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSearch(value);
    onSearchChange(value); // Notify parent component of the search change
  };

  return (
    <div className="flex flex-col items-center gap-2 ">
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search…"
          className="input lg:w-63 input-bordered rounded-full"
          value={search}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="btn btn-circle bg-sky-500 text-white"
          onClick={handleSubmit}
        >
          <IoSearchSharp className="w-6 h-6 outline-none" />
        </button>
      </div>
      {search && (
        <ul className="list">
          {filteredConversations.map((conversation) => (
            <li
              className={`flex gap-4 items-center rounded p-16 py-1 cursor-pointer w-full ${
                clickedConversation?._id === conversation._id
                  ? "bg-blue-500"
                  : "hover:bg-sky-500"
              }`}
              key={conversation._id}
              onClick={() => handleConversationSelect(conversation)}
              style={{ cursor: "pointer", color: "white" }}
            >
              <img
                src={conversation.profilePic}
                alt={conversation.nom}
                className="avatar"
                style={{ width: "50px", height: "50px", left: "-10px" }}
              />
              <span className="conversationName">{conversation.nom}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;
