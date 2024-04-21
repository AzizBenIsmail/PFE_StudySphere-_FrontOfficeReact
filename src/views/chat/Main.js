// //import Sidebar from "./components/sidebar/Sidebar";
// //import MessageContainer from "./components/messages/MessageContainer";
// import "./indexChat.css";
// //import './assets/styles/tailwind.css'
// import Footer from '../../components/Footers/FooterSmall' ;
// // import Navbar from "components/Navbars/Navbar";
// import Home from '../chat/pages/home/Home'

// const Main = () => {
//   return (
//     <div className='p-4 h-screen flex items-center justify-center'>
//      <Home/>
//      <Footer/>
//     </div>
//   );
// };
// export default Main;

import "./indexChat.css";
import Footer from "../../components/Footers/FooterSmall";
import Home from "../chat/pages/home/Home";
import Navbar from "../../components/Navbars/Navbar";

const Main = () => {
  return (
    <div className="bg-gray-600  flex flex-col min-h-screen min-w-screen">
       <Navbar className="fixed top-0 left-0 w-full z-50" />
      <div className="flex-1 flex  mb-4  mt-16   ">
        {" "}
        {/* Added mb-4 for margin-bottom */}
        <Home />
      </div>
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default Main;
