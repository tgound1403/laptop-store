import Header from '../components/Header';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProducts } from '../hooks/useGetProducts';
import { HiCheckBadge } from 'react-icons/hi2';
import { BsTelephone } from 'react-icons/bs';

const Detail = () => {
  const { id } = useParams();
  const { getProductByID, getProductByQuery } = useGetProducts();
  const [product, setProduct] = useState(null);
  const [relatedProduct, setRelatedProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductByID(id);
      setProduct(data);
    };

    const fetchRelatedProduct = async () => {
      const data = await getProductByQuery(product.tags);
      setRelatedProduct(data);
    };

    fetchProduct();
    fetchRelatedProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let getColor = (color) => {
    if (color === 'black' || color === 'white') return color;
    else return color + '-400';
  };

  return (
    <>
      <Header />
      <div className='bg-slate-200'>
        {product && (
          <div className='px-96 py-14'>
            <div className='flex flex-row  gap-5'>
              <div className='w-3/5 shadow-lg p-4 bg-white rounded-3xl'>
                <img src={product.image} className='mx-0 w-full my-auto' alt='product' />
              </div>
              <div className='w-2/5 px-4 py-6 h-auto shadow-lg rounded-3xl bg-white'>
                <p className='p-2 rounded-lg bg-red-100 mb-3 text-slate-500 text-sm font-medium'>
                  <BsTelephone className='inline w-4 h-4 mb-1 mr-1 text-red-500' />
                  Nếu bạn cần tư vấn về sản phẩm? gọi đến số 039 912 9859
                </p>
                <p className='inline p-2 rounded-lg bg-green-100 mt-2 text-slate-500 text-sm my-2 font-medium'>
                  <HiCheckBadge className='inline w-6 h-6 mb-1 mr-1 text-green-500' />
                  DStore là Nhà bán lẻ chính thức của {product.brand} tại Việt Nam
                </p>
                <p className='text-3xl font-bold my-2'>{product.name}</p>
                <p className='text-lg font-medium text-slate-500 mb-2'>Mã: {product._id}</p>
                <p className='text-3xl text-red-500 font-bold mb-2'>{product.price} VND</p>
                <p className='text-lg font-medium mb-1'>Màu</p>
                <p className='text-lg font-medium mb-2'>{product.color[0]}</p>
                <div className='flex my-2'>
                  <div className={`rounded-md w-10 h-10 bg-${getColor(product.color[0])} border border-black`}></div>
                </div>
                <p className='text-lg font-medium mb-1'>Phiên bản</p>
                <div className='flex flex-col p-4 rounded-xl shadow-md border-2 border-slate-200'>
                  <p className='text-lg'>{product.name}</p>
                  <p className='text-lg my-2 text-red-500'>{product.price} VND</p>
                  <div className='flex flex-row gap-3'>
                    <p className='inline p-2 rounded-lg bg-slate-100 font-medium w-1/4'>Nhập khẩu</p>
                    <p className='inline p-2 pl-5 rounded-lg bg-green-100 font-medium w-1/5'>Mới</p>
                  </div>
                </div>
                <p className='text-3xl font-bold my-3'>{product.price} VND</p>
                <button className='px-6 py-2 text-xl font-bold text-white rounded-lg bg-red-500 w-full'>
                  Thêm vào giỏ hàng
                </button>
              </div>
            </div>
            <div>
              <div className='rounded-3xl bg-white p-4 mt-5 shadow-lg'>
                <h1 className='h1 font-bold text-3xl mb-2'>Sản phẩm tương tự nhu cầu của bạn</h1>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem' }}>
                  {relatedProduct &&
                    relatedProduct.map((item, index) => {
                      return (
                        <article
                          key={index}
                          style={{
                            textAlign: 'center',
                            borderStyle: 'solid',
                            borderWidth: 'thin',
                            borderColor: '#ebebeb',
                            borderRadius: '10px',
                          }}
                        >
                          <img src={item.image} style={{ width: '200px', height: '200px' }} alt='related products' />
                          <div>
                            <em>{item.name}</em>
                            <p style={{ color: '#f65658' }}>{item.price}</p>
                          </div>
                        </article>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Detail;
