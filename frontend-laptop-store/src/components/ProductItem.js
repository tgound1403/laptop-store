import { useCart } from '../hooks/useCart';
import { useAuthContext } from '../hooks/useAuthContext';

export default function ProductItem({ item }) {
  const { postCart } = useCart();
  const { user } = useAuthContext();

  const handleAddCart = async () => {
    await postCart(user._id, item.name, item._id, item.image[0], item.price);
    console.log('post cart successfully');
  };

  let getColor = (color) => {
    if (color === 'black' || color === 'white') return color;
    else return color + '-400';
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
          <p className='text-red-600 font-bold inline'>
            {item.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })} đồng
          </p>
          <button
            onClick={handleAddCart}
            className=' inline-block mr-0 px-6 py-2.5 my-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
          >
            Mua
          </button>
        </div>
      </div>
    </div>
  );
}
