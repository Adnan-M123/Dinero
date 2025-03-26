import { GrRestaurant } from "react-icons/gr";
import { IoLogInOutline } from "react-icons/io5";


export default function Navbar() {
    return (
      <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
        {/* Left Icon */}
        <div className="text-2xl font-bold">
            <GrRestaurant />
        </div>
  
        {/* Login Button */}
        <button className="flex items-center gap-2 px-4 py-2 text-white bg-black rounded-lg hover:bg-gray-800">
        <IoLogInOutline />
        Log In
        </button>
      </nav>
    );
  }