import { FaUser } from 'react-icons/fa';
import { BsCartFill } from 'react-icons/bs';
import { BiSearch } from 'react-icons/bi';
import { TbTruckDelivery } from 'react-icons/tb';
import { HiOutlineShoppingCart, HiOutlineUser } from 'react-icons/hi';
import { MdOutlineLogout } from 'react-icons/md';
import { Link } from 'react-router-dom';
import 'flowbite';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';

const Header = () => {
  const { user } = useAuthContext();

  const { logout } = useLogout();

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
  };

  return (
    <nav className='w-full flex items-center border-b justify-evenly py-2'>
      <Link to='/'>
        <p className='text-3xl font-bold inline text-blue-700'>TD</p>
        <p className='text-3xl font-bold inline'>Store</p>
      </Link>
      <div className='bg-slate-100 px-4 py-0 flex align-center justify-between gap-2 rounded-full'>
        <BiSearch className='text-2xl mt-2 text-slate-500' />
        <input type='text' className='bg-slate-100 border-slate-100' placeholder='Search products' />
      </div>

      <div className='flex gap-3 align-center justify-around '>
        <Link to='/history'>
          <div className='p-3 bg-slate-100 hover:bg-slate-300 rounded-full w-12 h-12'>
            <TbTruckDelivery className='text-slate-900 text-2xl' />
          </div>
        </Link>
        <Link to={!user ? `/cart` : `/cart/${user._id}`}>
          <div className='p-3 bg-slate-100 hover:bg-slate-300 rounded-full items-center justify-center align-center h-12 w-20'>
            <BsCartFill className='text-slate-900 text-xl mb-3 inline' />
            {/* <p className='inline text-xl ml-3 mb-3'>1</p> */}
          </div>
        </Link>
        <div
          data-popover-target='popover-bottom'
          data-popover-placement='bottom'
          className='p-3 bg-slate-100 hover:bg-slate-300 rounded-full w-12 h-12 flex items-center justify-center'
        >
          <FaUser
            className='text-slate-900 text-xl'
            data-popover-target='popover-bottom'
            data-popover-placement='bottom'
          />
        </div>
        <div
          data-popover
          id='popover-bottom'
          role='tooltip'
          className='absolute z-10 p-2 px-4 invisible inline-block w-62 h-68 transition-opacity duration-300 bg-white border border-slate-200 rounded-lg shadow-sm opacity-0'
        >
          <h2 className='font-bold text-xl text-black mb-2'>Tài khoản</h2>
          {user && <p className='text-lg text-black font-medium '>{user.username}</p>}
          {user && <p className='text-lg text-slate-500 font-light mb-2'>0{user.phoneNumber}</p>}

          <Link to='/profile'>
            <div className='flex align-baseline pointer items-center hover:bg-slate-100 p-2 rounded-md justify-start gap-3'>
              <HiOutlineUser className='text-blue-500 font-bold text-2xl inline' />
              <p className='text-lg text-slate-500 font-medium inline'>Thông tin tài khoản</p>
            </div>
          </Link>
          <div className='flex align-baseline pointer items-center hover:bg-slate-100 p-2 rounded-md justify-start gap-3'>
            <HiOutlineShoppingCart className='text-blue-500 font-bold text-2xl inline' />
            <p className='text-lg text-slate-500 font-medium inline'>Lịch sử mua hàng</p>
          </div>
          {user ? (
            <div
              onClick={handleLogout}
              className='flex pointer align-baseline items-center hover:bg-slate-100 p-2 rounded-md justify-start gap-3'
            >
              <MdOutlineLogout className='text-red-500 font-bold text-2xl inline' />
              <p className='text-lg text-slate-500 font-medium inline'>Đăng xuất</p>
            </div>
          ) : (
            <Link to='/signin'>
              <div className='flex pointer align-baseline items-center hover:bg-slate-100 p-2 rounded-md justify-start gap-3'>
                <MdOutlineLogout className='text-green-500 font-bold text-2xl inline' />
                <p className='text-lg text-slate-500 font-medium inline'>Đăng nhập</p>
              </div>
            </Link>
          )}

          <div data-popper-arrow></div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
