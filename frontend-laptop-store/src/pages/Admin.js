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
  const { getAllUser, getSpecificUSer, deleteSpecificUser, updateUserRole } = useGetUser();
  const { getAllInvoice, removeSpecificInvoice } = useInvoice();
  const [product, setProduct] = useState(null);
  const [users, setUsers] = useState(null);
  const [invoice, setInvoice] = useState(null);
  const [userName, setUserName] = useState(null);
  const moment = require('moment');

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id);
  };

  const handleDeleteAccount = async (id) => {
    await deleteSpecificUser(id);
  };

  const handleUpdateUserRole = async (id, role) => {
    await updateUserRole(id, role);
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
      setUserName(data.userName);
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
            {user.username === 'trieuduong' ? <p>Hello admin, {user.username}</p> : <p>Hello guest</p>}
          </h1>
        )}
        {user &&
          (user.username === 'trieuduong' ? (
            <>
              <button
                href='create'
                type='button'
                className='btn font-bold mb-2 btn-success px-4 py-2 rounded-lg bg-white shadow-lg'
              >
                Add product
              </button>

              <div className='overflow-x-auto relative rounded-xl shadow-lg '>
                <table className='table bg-white w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                  <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                    <tr>
                      <th scope='col' class='py-3 px-6'>
                        image
                      </th>
                      <th scope='col' class='py-3 px-6'>
                        Name
                      </th>
                      <th scope='col' class='py-3 px-6'>
                        Brand
                      </th>
                      <th scope='col' class='py-3 px-6'>
                        Color
                      </th>
                      <th scope='col' class='py-3 px-6'>
                        Price
                      </th>
                      <th scope='col' class='py-3 px-6'>
                        Action
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
                                <p class='font-medium text-blue-600 dark:text-blue-500 hover:underline'>Edit</p>
                              </Link>
                              <p
                                onClick={() => handleDeleteProduct(item._id)}
                                class='font-medium text-red-600 dark:text-red-500 hover:underline'
                              >
                                Remove
                              </p>
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
                        Name
                      </th>
                      <th scope='col' class='py-3 px-6'>
                        Email
                      </th>
                      <th scope='col' class='py-3 px-6'>
                        Phone Number
                      </th>
                      <th scope='col' class='py-3 px-6'>
                        Created At
                      </th>
                      <th scope='col' class='py-3 px-6'>
                        Action
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
                            <td className='py-4 px-6'>
                              <Link to={`/account/${item._id}`}>
                                <i className='me-4 fa-solid fa-eye' style={{ color: '#1290ec' }}></i>
                              </Link>
                              <i
                                className='me-4 fa-solid fa-trash'
                                style={{ color: '#ff0000' }}
                                onClick={() => handleDeleteAccount(item._id)}
                              ></i>
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
                        Invoice ID
                      </th>
                      <th scope='col' class='py-3 px-6'>
                        Customer
                      </th>
                      <th scope='col' class='py-3 px-6'>
                        Total
                      </th>
                      <th scope='col' class='py-3 px-6'>
                        Status
                      </th>
                      <th scope='col' class='py-3 px-6'>
                        Ordered Time
                      </th>
                      <th scope='col' class='py-3 px-6'>
                        Manipulate
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
                            <td className='py-4 px-6'>{userName}</td>
                            <td className='py-4 px-6'>{formatCurrency(item.total)}</td>
                            <td className='py-4 px-6'>{item.status ? 'Done' : 'Pending'}</td>
                            <td className='py-4 px-6'>
                              {new Date(item.createdAt).toLocaleString('en', { timeZone: 'UTC' })}
                            </td>
                            <td className='flex py-4 px-6 space-x-3'>
                              <Link to={`/invoice/detail/${item._id}`}>
                                <i className='me-4 fa-solid fa-eye' style={{ color: '#1290ec' }}></i>
                              </Link>
                              <Link to={`/invoice/update/${item._id}`}>
                                <i className='me-4 fa-solid fa-pen-to-square' style={{ color: '#ffff00' }}></i>
                              </Link>
                              <i
                                className='me-4 fa-solid fa-trash'
                                style={{ color: '#ff0000' }}
                                onClick={() => handleRemoveInvoice(item._id)}
                              ></i>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <h1 className='font-bold text-4xl'>You need admin previlege to access this page</h1>
          ))}
      </div>
    </>
  );
}
