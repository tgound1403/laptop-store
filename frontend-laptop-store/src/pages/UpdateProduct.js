import React, { useState, useEffect } from 'react';
import { useGetProducts } from '../hooks/useGetProducts';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';

export default function UpdateProduct() {
  const { id } = useParams();
  const { getProductByID, updateProduct } = useGetProducts();
  const [data, setData] = useState(null);

  const fetchProduct = async () => {
    const data = await getProductByID(id);
    setData(data);
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const form = document.querySelector('#form');
    const formData = new FormData(form);
    await updateProduct(id, formData);
  };

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <div className='bg-slate-200 px-96 py-12'>
        <h1 className='font-bold text-3xl'>Update Product</h1>
        {data && (
          <form
            id='form'
            encType='multipart/form-data'
            className='flex flex-col gap-8 p-4 rounded-3xl shadow-lg bg-white'
          >
            <img className='w-1/2 mx-auto my-0' src={`http://localhost:4000/${data.image}`} alt='product' />
            <input type='file' name='image' required />
            <span>
              <label htmlFor='name' style={{ marginRight: '2rem' }}>
                Product's Name
              </label>
              <input type='text' name='name' defaultValue={data.name} />
              <i
                className='fa-solid fa-pencil'
                style={{
                  padding: '10px',
                  backgroundColor: '#f89c2c',
                  color: '#fff',
                  borderRadius: '6px',
                  marginLeft: '2rem',
                }}
              ></i>
            </span>
            <span>
              <label htmlFor='price' style={{ marginRight: '2rem' }}>
                Product's Price
              </label>
              <input type='text' name='price' placeholder='price' defaultValue={data.price} />
              <i
                className='fa-solid fa-pencil'
                style={{
                  padding: '10px',
                  backgroundColor: '#f89c2c',
                  color: '#fff',
                  borderRadius: '6px',
                  marginLeft: '2rem',
                }}
              ></i>
            </span>
            <span>
              <label htmlFor='color' style={{ marginRight: '2rem' }}>
                Product's Color
              </label>
              <input type='text' name='color' placeholder='color' defaultValue={data.color} />
              <i
                className='fa-solid fa-pencil'
                style={{
                  padding: '10px',
                  backgroundColor: '#f89c2c',
                  color: '#fff',
                  borderRadius: '6px',
                  marginLeft: '2rem',
                }}
              ></i>
            </span>
            <span>
              <label htmlFor='brand' style={{ marginRight: '2rem' }}>
                Product's Brand
              </label>
              <input type='text' name='brand' placeholder='brand' defaultValue={data.brand} />
              <i
                className='fa-solid fa-pencil'
                style={{
                  padding: '10px',
                  backgroundColor: '#f89c2c',
                  color: '#fff',
                  borderRadius: '6px',
                  marginLeft: '2rem',
                }}
              ></i>
            </span>
            <span>
              <label htmlFor='tags' style={{ marginRight: '2rem' }}>
                Tags
              </label>
              <input type='text' name='tags' placeholder='tag' defaultValue={data.tags} />
              <i
                className='fa-solid fa-pencil'
                style={{
                  padding: '10px',
                  backgroundColor: '#f89c2c',
                  color: '#fff',
                  borderRadius: '6px',
                  marginLeft: '2rem',
                }}
              ></i>
            </span>
            <input
              type='submit'
              onClick={handleUpdateProduct}
              style={{
                width: '8rem',
                color: '#fff',
                backgroundColor: '#7cfc00',
                borderColor: 'transparent',
                borderRadius: '6px',
                padding: '13px',
                fontWeight: 'bold',
              }}
            />
          </form>
        )}
      </div>
    </>
  );
}
