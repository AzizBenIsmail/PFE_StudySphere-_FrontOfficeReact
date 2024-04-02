import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
}));

export default useConversation;



// import { create } from "zustand";

// const useConversation = create((set) => ({
//   selectedConversation: null,
//   setSelectedConversation: (selectedConversation) => {
//     // Check if selectedConversation contains messages
//     if (selectedConversation && selectedConversation.messages) {
//       // If messages are present, update state with selectedConversation
//       set({ selectedConversation });
//     } else {
//       // If messages are not present, update state with an empty array for messages
//       set({ selectedConversation: { ...selectedConversation, messages: [] } });
//     }
//   },
//   messages: [],
//   setMessages: (messages) => set({ messages }),
// }));

// export default useConversation;
