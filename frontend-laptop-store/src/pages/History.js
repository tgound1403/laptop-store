import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useInvoice } from '../hooks/useInvoice';

const Cart = () => {
  const [invoices, setInvoices] = useState(null);
  const { getAllInvoice } = useInvoice();
  const moment = require('moment');

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getAllInvoice();
      setInvoices(data.reverse());
    };

    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <p className='text-2xl font-bold  mb-2'>Lịch sử mua hàng</p>
        <div className='flex justify-between align-start gap-5'>
          <div className='w-3/4'>
            {invoices &&
              invoices.map((item, index) => {
                return (
                  <div
                    key={index}
                    className='rounded-xl shadow-lg py-3 px-4 flex bg-white items-center justify-between my-2'
                  >
                    <div className='flex-col'>
                      <a href={`/invoice/${item._id}`} className='font-bold text-xl'>
                        {item._id}
                      </a>
                      <p className='text-red-500 text-lg'>{formatCurrency(item.total)}</p>
                    </div>
                    <div className='flex-col'>
                      <p className='font-bold text-xl'>{item.status}</p>
                      <p className='text-red-500 text-lg'>{moment(item.createdAt).fromNow()}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
