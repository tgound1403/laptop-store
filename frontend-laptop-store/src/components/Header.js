import { FaUser } from "react-icons/fa";
import { BsCartFill } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { TbTruckDelivery } from "react-icons/tb";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <nav className="w-full flex items-center border-b justify-evenly py-2">
      <Link to="/">
        <p className="text-3xl font-bold">DStore</p>
      </Link>
      {/* <div className="flex justify-between gap-7 font-bold">
        <a href="/">Home</a>
        <a href="/user">User</a>
        <a href="/">User</a>
      </div> */}
      <div className="bg-slate-100 px-4 py-2 flex align-center justify-between gap-2 rounded-full">
        <BiSearch className="text-2xl text-slate-500" />
        <input
          type="text"
          className="bg-slate-100 border-slate-100"
          placeholder="Search products"
        />
      </div>

      <div className="flex gap-3 align-center justify-around ">
        <Link to="/history">
          <div className="p-3 bg-slate-100 hover:bg-slate-300 rounded-full w-12 h-12">
            <TbTruckDelivery className="text-slate-900 text-2xl" />
          </div>
        </Link>
        <Link to="/cart">
          <div className="p-3 bg-slate-100 hover:bg-slate-300 rounded-full items-center justify-center align-center h-12 w-20">
            <BsCartFill className="text-slate-900 text-xl mb-3 inline" />
            <p className="inline text-xl ml-3 mb-3">1</p>
          </div>
        </Link>
        <Link to="/user">
          <div className="p-3 bg-slate-100 hover:bg-slate-300 rounded-full w-12 h-12 flex items-center justify-center">
            <FaUser className="text-slate-900 text-xl" />
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
