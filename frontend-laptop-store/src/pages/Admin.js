import { useAuthContext } from '../hooks/useAuthContext';
import { useGetProducts } from '../hooks/useGetProducts';
import { useEffect, useState } from 'react';
import Header from '../components/Header';

export default function Admin() {
  const { user } = useAuthContext();
  const { getProducts } = useGetProducts();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProducts();
      setProduct(data);
    };
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(user);

  return (
    <>
      <Header />
      <div className='px-96 py-12 bg-slate-200 h-screen'>
        {user && (
          <h1 className='text-3xl font-bold mb-5'>
            {user.username === 'trieuduong' ? <p>Hello admin, {user.username}</p> : <p>Hello guest</p>}
          </h1>
        )}

        {user.username === 'trieuduong' ? (
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
                          <td className='py-4 px-6'>{item.price} VND</td>
                          <td class='flex py-4 px-6 space-x-3'>
                            <a href='!#' class='font-medium text-blue-600 dark:text-blue-500 hover:underline'>
                              Edit
                            </a>
                            <a href='!#' class='font-medium text-red-600 dark:text-red-500 hover:underline'>
                              Remove
                            </a>
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
        )}
      </div>
    </>
  );
}
