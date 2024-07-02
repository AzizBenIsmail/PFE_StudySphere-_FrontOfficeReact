// Home.js
import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer";
import ProfileSidebar from "../../components/profileSidbar/ProfileSidebar";
import useConversation from "../../zustand/useConversation";

const Home = () => {
  const { selectedConversation } = useConversation();

  return (
    <div className="flex ">
      <div className="flex rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <Sidebar />
        <div className={`flex ${selectedConversation ? "" : "w-100"}`}>
          {/* Conditionally apply class */}
          <MessageContainer />
        </div>
      </div>
      {/* Conditionally render the ProfileSidebar */}
      {selectedConversation && (
        <div className="bg-gray-500  profile-sidebar  overflow-y-auto">
          <ProfileSidebar />
        </div>
      )}
    </div>
  );
};

export default Home;



// import React from "react";
// import Sidebar from "../../components/sidebar/Sidebar";
// import MessageContainer from "../../components/messages/MessageContainer";
// import ProfileSidebar from "../../components/profileSidbar/ProfileSidebar" // Import the new ProfileSidebar component
// import  useConversation  from "../../zustand/useConversation"; // Assuming you have a context for managing conversations

// const Home = () => {
//   const { selectedConversation } = useConversation(); // Get the selected conversation from context

//   return (
//     <div className="flex">
//       <div className=" flex sm:h-[450px] md:h-[700px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
//         <Sidebar />
//         <MessageContainer />
//       </div>
//       <div className="bg-red-500  w-60">
//         {/* Render ProfileSidebar only when a conversation is selected */}
//         {selectedConversation && <ProfileSidebar />}
//       </div>
//     </div>
//   );
// };

// export default Home;
