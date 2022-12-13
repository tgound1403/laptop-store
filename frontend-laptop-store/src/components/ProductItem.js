import { useCartContext } from '../hooks/useCartContext';
import { useState, useEffect } from 'react';

export default function ProductItem({ item }) {
  const [cart, setCart] = useState([]);
  const { dispatch } = useCartContext();

  let getColor = (color) => {
    if (color === 'black' || color === 'white') return color;
    else return color + '-400';
  };

  const handleAddCart = async () => {
    setCart((prev) => [...prev, item._id]);
  };

  useEffect(() => {
    dispatch({ type: 'SET_CART', payload: cart });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  const formatCurrency = (value) => {
    return Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  return (
    <div className='flex justify-center'>
      <div className='rounded-3xl shadow-lg bg-white w-64 relative'>
        <a href={`/item/${item._id}`} data-mdb-ripple='true' data-mdb-ripple-color='light'>
          <img className='rounded-t-3xl' src={item.image} alt='' />
        </a>
        <div className='p-6'>
          <h5 className='text-gray-900 text-xl font-medium mb-2'>{item.name}</h5>
          <div className='flex my-2'>
            <div className={`rounded-md w-6 h-6 bg-${getColor(item.color[0])} border border-black`}></div>
          </div>
          <p className='text-base mb-4 inline'>Từ </p>
          <p className='text-red-600 font-bold inline'>{formatCurrency(item.price)}</p>
          <button
            onClick={handleAddCart}
            className='block mr-0 px-6 py-2.5 my-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
          >
            Mua
          </button>
        </div>
      </div>
    </div>
  );
}
