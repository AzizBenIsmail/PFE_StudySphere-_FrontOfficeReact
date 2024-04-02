import { useState } from "react";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";

const Sidebar = () => {
  const [search, setSearch] = useState("");
  const [selectedFilteredConversation, setSelectedFilteredConversation] = useState(null);

  const handleSearchChange = (value) => {
    setSearch(value);
    setSelectedFilteredConversation(null); // Reset selected conversation when search changes
  };

  const handleFilteredConversationSelect = (conversation) => {
    setSelectedFilteredConversation(conversation);
  };

  const handleConversationClick = (conversation) => {
    // Define your logic here when a conversation is clicked
    console.log("Clicked conversation:", conversation);
  };

  return (
    <div className='border-r border-slate-500 p-4 flex flex-col'>
      <SearchInput 
        onSearchChange={handleSearchChange} 
        onFilteredConversationSelect={handleFilteredConversationSelect} 
        onConversationClick={handleConversationClick} 
      />
      <div className='divider px-3'></div>
      {!search ? <Conversations /> : <Conversations selectedConversation={selectedFilteredConversation} />}
     
    </div>
  );
};

export default Sidebar;

