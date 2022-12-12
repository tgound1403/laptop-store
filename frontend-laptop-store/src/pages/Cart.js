import { AiOutlinePlus, AiOutlineMinus, AiFillDelete, AiOutlineCheck } from 'react-icons/ai';
import Header from '../components/Header';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCartContext } from '../hooks/useCartContext';
import { useGetProducts } from '../hooks/useGetProducts';
import { useInvoice } from '../hooks/useInvoice';

const Cart = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const { cart } = useCartContext();
  const { getProductByID } = useGetProducts();
  const { postInvoice } = useInvoice();
  const number = [];
  const totalPrice = [];

  const calculateTotal = (total, number) => {
    return total + number;
  };

  const fetchProducts = async (id) => {
    const data = await getProductByID(id);
    setProduct((prev) => [...prev, data]);
  };

  const handlePostInvoice = async (totalPrice) => {
    await postInvoice(id, totalPrice[0], cart);
  };

  useEffect(() => {
    cart.map((item) => fetchProducts(item));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(cart);

  const formatCurrency = (value) => {
    return Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  return (
    <>
      <Header />
      <div className='bg-slate-100 h-screen px-96 pt-7'>
        <Link to='/'>
          {/* TODO Style this button */}
          <p className='text-lg text-blue-700'>Tiếp tục mua hàng</p>
        </Link>
        <p className='text-2xl font-bold  mb-2'>Giỏ hàng</p>
        <div className='flex justify-between align-start gap-5'>
          <div className='w-3/4'>
            {product &&
              product.map((item, index) => {
                return (
                  <div className='rounded-xl shadow-lg py-3 px-4 flex bg-white items-center justify-between my-2'>
                    <img className='h-24' src={`http://localhost:4000${item.image}`} alt='product will buy' />
                    <div className='flex-col'>
                      <p className='font-bold text-xl'>{item.name}</p>
                      <p className='text-red-500 text-lg'>{formatCurrency(item.price)}</p>
                    </div>
                    <div className='flex justify-between gap-5'>
                      <div className='flex'>
                        <AiOutlineMinus className='bg-slate-200 hover:bg-slate-300 transition duration-150 ease-in-out rounded-lg w-10 h-10 p-2 text-black' />
                        <p className='text-2xl mx-3'>{number.push(item.price)}</p>
                        <AiOutlinePlus className='bg-slate-200 hover:bg-slate-300 transition duration-150 ease-in-out rounded-lg w-10 h-10 p-2 text-black' />
                      </div>
                      <p className='text-red-500 font-bold text-xl'>{formatCurrency(item.price)}</p>
                      <AiFillDelete className='bg-red-500 hover:bg-red-600 rounded-lg w-10 h-10 p-2 text-white transition duration-150 ease-in-out' />
                    </div>
                  </div>
                );
              })}
          </div>

          <div className='w-96'>
            <div className='rounded-xl shadow-lg mb-5 bg-white p-4'>
              <p className='font-bold text-black text-2xl mb-5'>Mã khuyến mãi</p>
              <div className='flex flex-row gap-2 justify-between items-center align-middle'></div>
              <input className='text-xl border-2 inline rounded-lg h-10 border-slate-300 px-4 py-2' />
              <AiOutlineCheck className='h-10 w-10 inline rounded-lg ml-2 mb-2 bg-blue-400 hover:bg-blue-500 text-white p-2 font-bold transition duration-150 ease-in-out' />
            </div>
            <div className='rounded-xl shadow-lg bg-white p-4'>
              <p className='font-bold text-black text-2xl mb-5'>Tóm tắt đơn hàng</p>
              <div className='text-xl'>
                <div className='flex justify-between'>
                  <p>Tạm tính</p>
                  <p>{formatCurrency(number.reduce(calculateTotal, 0))}</p>
                </div>
                <div className='flex justify-between'>
                  <p>Khuyến mãi</p>
                  {/* TODO create sale function */}
                  <p>1.000.000</p>
                </div>
                <div className='flex justify-between'>
                  <p>Tổng cộng</p>
                  <p className='text-red-500'>{formatCurrency(number.reduce(calculateTotal, 0))}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  totalPrice.push(number.reduce(calculateTotal));
                  handlePostInvoice(totalPrice);
                }}
                className='rounded-lg font-bold text-xl bg-red-500 hover:bg-red-600 mt-5 text-white w-full px-4 py-2 transition duration-150 ease-in-out'
              >
                Đặt hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
