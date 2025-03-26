import { GrRestaurant } from "react-icons/gr";
import { IoLogInOutline } from "react-icons/io5";


export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-[#283618] shadow-md">
      {/* Left Icon */}
      <div className="text-2xl font-bold text-white flex flex-col items-center">
        <GrRestaurant style={{ color: "white", fontSize: "24px" }} />
        <span>DINERO</span>
      </div>

      {/* Login Button */}
      <button className="flex items-center gap-2 px-4 py-2 text-[#283618] font-bold bg-white rounded-lg hover:bg-gray-800">
        <IoLogInOutline style={{ fontSize: "24px"}}/>
        Log In
      </button>
    </nav>
  );
}
