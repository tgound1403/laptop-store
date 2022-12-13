import { useAuthContext } from '../hooks/useAuthContext';
import { useGetProducts } from '../hooks/useGetProducts';
import { useEffect, useState } from 'react';
import { useGetUser } from '../hooks/useGetUser';
import { useInvoice } from '../hooks/useInvoice';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default function Admin() {
  const { user } = useAuthContext();
  const { getProducts, deleteProduct } = useGetProducts();
  const { getAllUser, getSpecificUSer, deleteSpecificUser } = useGetUser();
  const { getAllInvoice, removeSpecificInvoice } = useInvoice();
  const [product, setProduct] = useState(null);
  const [users, setUsers] = useState(null);
  const [invoice, setInvoice] = useState(null);
  const [username, setUsername] = useState(null);
  const moment = require('moment');

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id);
  };

  const handleDeleteAccount = async (id) => {
    await deleteSpecificUser(id);
  };

  const handleRemoveInvoice = async (id) => {
    await removeSpecificInvoice(id);
  };

  const formatCurrency = (value) => {
    return Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProducts();
      setProduct(data);
    };

    const fetchUsers = async () => {
      const data = await getAllUser();
      setUsers(data);
    };

    const fetchInvoices = async () => {
      const data = await getAllInvoice();
      setInvoice(data);
    };

    fetchProduct();
    fetchUsers();
    fetchInvoices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getUserName = async (id) => {
      const data = await getSpecificUSer(id);
      setUsername(data.username);
    };

    if (invoice) invoice.map((item) => getUserName(item.userID));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoice]);

  return (
    <>
      <Header />
      <div className='px-96 py-12 bg-slate-200'>
        {user && (
          <h1 className='text-3xl font-bold mb-5'>
            {user.username === 'trieuduong' ? (
              <p>Xin chào, {user.username}</p>
            ) : (
              <p>Xin lỗi bạn không được phép sử dụng trang này</p>
            )}
          </h1>
        )}
        {user &&
          (user.username === 'trieuduong' ? (
            <>
              <Link to='create-product'>
                <button
                  href='create'
                  type='button'
                  className='btn font-bold mb-2 btn-success px-4 py-2 rounded-lg bg-white shadow-lg'
                >
                  Thêm sản phẩm
                </button>
              </Link>

              <div className='overflow-x-auto relative rounded-xl shadow-lg '>
                <table className='table bg-white w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                  <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                    <tr>
                      <th scope='col' class='py-3 px-6'>
                        Hình ảnh
                      </th>
                      <th scope='col' class='py-3 px-6'>
                        Tên sản phẩm
                      </th>
                      <th scope='col' class='py-3 px-6'>
                        Thương hiệu
                      </th>
                      <th scope='col' class='py-3 px-6'>
                        Màu sắc
                      </th>
                      <th scope='col' class='py-3 px-6'>
                        Giá
                      </th>
                      <th scope='col' class='py-3 px-6'>
                        Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {product &&
                      product.map((item, index) => {
                        return (
                          <tr key={index} className='bg-white border-b'>
                            <th
                              style={{ width: '12rem' }}
                              className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap '
                            >
                              <img style={{ width: '30%' }} src={item.image} alt='product preview' />
                            </th>
                            <th scope='row' className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap '>
                              {item.name}
                            </th>
                            <td className='py-4 px-6'>{item.brand}</td>
                            <td className='py-4 px-6'>{item.color}</td>
                            <td className='py-4 px-6'>{formatCurrency(item.price)}</td>
                            <td class='flex py-4 px-6 space-x-3'>
                              <Link to={`/admin/update-product/${item._id}`}>
                                <p class='font-medium text-blue-600 dark:text-blue-500 hover:underline'>Sửa</p>
                              </Link>
                              <button
                                onClick={() => handleDeleteProduct(item._id)}
                                class='font-medium text-red-600 dark:text-red-500 hover:underline'
                              >
                                Xóa
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              <br />
              <div className='overflow-x-auto relative rounded-xl shadow-lg '>
                <table className='table bg-white w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                  <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                    <tr>
                      <th scope='col' class='py-3 px-6'>
                        #
                      </th>
                      <th scope='col' class='py-3 px-6'>
                        Tên tài khoản
                      </th>
                      <th scope='col' class='py-3 px-6'>
                        Email
                      </th>
                      <th scope='col' class='py-3 px-6'>
                        Số điện thoại
                      </th>
                      <th scope='col' class='py-3 px-6'>
                        Đã họat động từ
                      </th>
                      <th scope='col' class='py-3 px-6'>
                        Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users &&
                      users.map((item, index) => {
                        return (
                          <tr className='bg-white border-b' key={index}>
                            <th className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap ' scope='row'>
                              {index + 1}
                            </th>
                            <td className='py-4 px-6'>{item.username}</td>
                            <td className='py-4 px-6'>{item.email}</td>
                            <td className='py-4 px-6'>{item.phoneNumber}</td>
                            <td className='py-4 px-6'>{moment(item.createdAt).fromNow()}</td>
                            <td class='flex py-4 px-6 space-x-3'>
                              <button
                                onClick={() => handleDeleteAccount(item._id)}
                                class='font-medium text-red-600 dark:text-red-500 hover:underline'
                              >
                                Xóa
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              <br />
              <div className='overflow-x-auto relative rounded-xl shadow-lg '>
                <table className='table bg-white w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                  <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                    <tr>
                      <th scope='col' class='py-3 px-6'>
                        #
                      </th>
                      <th scope='col' class='py-3 px-6'>
                        Mã vận đơn
                      </th>
                      <th scope='col' class='py-3 px-6'>
                        Mã khách hàng
                      </th>
                      <th scope='col' class='py-3 px-6'>
                        Tổng tiền
                      </th>
                      <th scope='col' class='py-3 px-6'>
                        Trạng thái
                      </th>
                      <th scope='col' class='py-3 px-6'>
                        Thời gian đặt hàng
                      </th>
                      <th scope='col' class='py-3 px-6'>
                        Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice &&
                      invoice.map((item, index) => {
                        return (
                          <tr className='bg-white border-b' key={item._id}>
                            <th className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap ' scope='row'>
                              {index + 1}
                            </th>
                            <th
                              className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap '
                              style={{ width: '12rem' }}
                            >
                              {item._id}
                            </th>
                            <td className='py-4 px-6'>{item.userID}</td>
                            <td className='py-4 px-6'>{formatCurrency(item.total)}</td>
                            <td className='py-4 px-6'>{item.status ? 'Done' : 'Pending'}</td>
                            <td className='py-4 px-6'>
                              {new Date(item.createdAt).toLocaleString('en', { timeZone: 'UTC' })}
                            </td>

                            <td class='flex py-4 px-6 space-x-3'>
                              <Link to={`/invoice/${item._id}`}>
                                <p class='font-medium text-blue-600 dark:text-blue-500 hover:underline'>Chi tiết</p>
                              </Link>
                              <Link to={`/invoice/update/${item._id}`}>
                                <p class='font-medium text-blue-600 dark:text-yellow-400 hover:underline'>Cập nhật</p>
                              </Link>
                              <button
                                onClick={() => handleRemoveInvoice(item._id)}
                                class='font-medium text-red-600 dark:text-red-500 hover:underline'
                              >
                                Xóa
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <h1 className='font-bold text-4xl'>Bạn cần quyền quản trị viên để xem thông tin này </h1>
          ))}
      </div>
    </>
  );
}
