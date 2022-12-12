import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useInvoice } from '../hooks/useInvoice';
import { useGetUser } from '../hooks/useGetUser';
import { useGetProducts } from '../hooks/useGetProducts';
import Header from '../components/Header';

export default function Detail() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const { getSpecificInvoice } = useInvoice();
  const { getSpecificUSer } = useGetUser();
  const { getProductByID } = useGetProducts();

  useEffect(() => {
    const fetchSpecificInvoice = async () => {
      const data = await getSpecificInvoice(id);
      setInvoice(data);
    };

    fetchSpecificInvoice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchUser = async (id) => {
      const data = await getSpecificUSer(id);
      setUser(data);
    };

    const fetchProducts = async (id) => {
      const data = await getProductByID(id);
      setProducts((prev) => [...prev, data]);
    };

    if (invoice) {
      fetchUser(invoice.userID);
      invoice.productID.map((item) => fetchProducts(item));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoice]);

  const formatCurrency = (value) => {
    return Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  return (
    <>
      <Header />
      <div className='px-96 py-12 bg-slate-200 h-screen'>
        <h1 className='font-bold text-3xl mb-3'>Chi tiết đơn hàng</h1>
        {invoice && (
          <div className='flex align-middle items-start justify-around gap-10 p-5 w-auto rounded-3xl bg-white shadow-lg'>
            <section>
              <article>
                <h3>
                  <span className='font-bold text-2xl mb-1'>Thông tin đơn hàng</span>
                  <i className='ml-2'></i>
                </h3>
              </article>
              <article>
                <div>
                  <p className='inline font-medium'>Mã vận đơn:</p>
                  <span className='ml-2'>{invoice._id}</span>
                </div>
                <div>
                  <p className='inline font-medium'>Thời gian đặt hàng:</p>
                  <span className='ml-2'>{new Date(invoice.createdAt).toLocaleString('en', { timeZone: 'UTC' })}</span>
                </div>
                <div>
                  <p className='inline font-medium'>Trạng thái:</p>
                  <p className='inline'>
                    {invoice.status ? (
                      <p className='px-4 py-2 bg-green-500 w-40 font-bold text-white text-lg rounded-lg'>
                        Đã giao hàng
                      </p>
                    ) : (
                      <p className='px-4 py-2 bg-yellow-400 w-48 font-bold text-white text-lg rounded-lg'>
                        Đang vận chuyển
                      </p>
                    )}
                  </p>
                </div>
              </article>
              <article style={{ marginTop: '2rem' }}>
                <div>
                  <h3>
                    <span className='font-bold text-2xl mb-1'>Thông tin khách hàng</span>
                    <i className='ml-2'></i>
                  </h3>
                </div>
                <div>
                  <p className='inline font-medium'>Tên người dùng:</p>
                  <span className='ml-2'>{user && user.username}</span>
                </div>
                <div>
                  <p className='inline font-medium'>Số điện thoại:</p>
                  <span className='ml-2'>0{user && user.phoneNumber}</span>
                </div>
                <div>
                  <p className='inline font-medium'>Email:</p>
                  <span className='ml-2'>{user && user.email}</span>
                </div>
                <div>
                  <p className='inline font-medium'>Địa chỉ:</p>
                  <span className='ml-2'>a94, đường số 5, khu Kim Sơn, phường Tân Phong, quận 7, Việt Nam</span>
                </div>
              </article>
              <p className='font-bold text-2xl mt-5 mb-1'>Tổng tiền</p>
              <p className='font-medium text-3xl text-blue-700 mb-1'>{formatCurrency(invoice.total)}</p>
            </section>
            <section>
              <article>
                <div>
                  <h3>
                    <span className='font-bold text-2xl mb-1'>Sản phẩm đã mua</span>
                    <i className='ml-2'></i>
                  </h3>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                  }}
                >
                  {products &&
                    products.map((item) => {
                      return (
                        <div className='flex items-center gap-5 shadow-lg rounded-lg bg-blue p-4 w-full'>
                          <img src={`http://localhost:4000${item.image}`} alt='product' style={{ height: '76px' }} />
                          <div>
                            <p>{item.name}</p>
                            <p>{formatCurrency(item.price)}</p>
                          </div>
                          <p>1 (số lượng)</p>
                        </div>
                      );
                    })}
                </div>
              </article>
            </section>
          </div>
        )}
      </div>
    </>
  );
}
