import Header from '../components/Header';
import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetProducts } from '../hooks/useGetProducts';
import { useGetReview } from '../hooks/useGetReview';
import { useReviewsContext } from '../hooks/useReviewsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { HiCheckBadge } from 'react-icons/hi2';
import { BsTelephone } from 'react-icons/bs';
import { useCartContext } from '../hooks/useCartContext';
const moment = require('moment');

const Detail = () => {
  const { id } = useParams();
  const { getProductByID, getProductByQuery } = useGetProducts();
  const [product, setProduct] = useState(null);
  const [relatedProduct, setRelatedProduct] = useState(null);
  const commentRef = useRef();
  const { getReviewByID, postReview } = useGetReview();
  const { reviews } = useReviewsContext();
  const { user } = useAuthContext();

  let getColor = (color) => {
    if (color === 'black' || color === 'white') return color;
    else return color + '-300';
  };

  const [cart, setCart] = useState([]);
  const { dispatch } = useCartContext();

  const handleAddCart = async () => {
    setCart((prev) => [...prev, product._id]);
  };

  useEffect(() => {
    dispatch({ type: 'SET_CART', payload: cart });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  useEffect((product) => {
    const fetchProduct = async () => {
      const data = await getProductByID(id);
      setProduct(data);
    };

    const fetchRelatedProduct = async () => {
      const data = await getProductByQuery(product.tags[0]);
      setRelatedProduct(data);
    };

    const fetchReview = async () => {
      await getReviewByID(id);
    };

    fetchProduct();
    fetchRelatedProduct();
    fetchReview();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatCurrency = (value) => {
    return Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  const handleComment = async () => {
    console.log(commentRef.current.value);
    await postReview(id, user.userName, commentRef.current.value);
  };

  return (
    <>
      <Header />
      <div className='bg-slate-200'>
        {product && (
          <div className='px-96 py-14'>
            <Link to='/'>
              <p className='text-lg text-blue-700 mb-3'>Trở về trang chủ</p>
            </Link>
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
                <p className='text-3xl text-red-500 font-bold mb-2'>{formatCurrency(product.price)}</p>
                <p className='text-lg font-medium mb-1'>Nhu cầu</p>
                <p className='my-2'>
                  {product.tags.map((item, index) => {
                    return (
                      <span className='bg-slate-100 text-slate-500 px-2 py-1 rounded-md mr-2' key={index}>
                        {item}
                      </span>
                    );
                  })}
                </p>
                <p className='text-lg font-medium mb-1'>Màu</p>
                <div className='flex my-2'>
                  <div className={`rounded-md w-10 h-10 bg-${getColor(product.color[0])} border border-black`}></div>
                </div>
                <p className='text-lg font-medium mb-1'>Phiên bản</p>
                <div className='flex flex-col p-4 rounded-xl shadow-md border-2 border-slate-200'>
                  <p className='text-lg'>{product.name}</p>
                  <p className='text-lg my-2 text-red-500'>{formatCurrency(product.price)}</p>
                  <div className='flex flex-row gap-3'>
                    <p className='inline p-2 rounded-lg bg-slate-100 font-medium w-1/4'>Nhập khẩu</p>
                    <p className='inline p-2 pl-5 rounded-lg bg-green-100 font-medium w-1/5'>Mới</p>
                  </div>
                </div>
                <p className='text-3xl font-bold my-3'>{formatCurrency(product.price)}</p>
                <button
                  onClick={handleAddCart}
                  className='px-6 py-2 text-xl inline font-bold text-white rounded-lg bg-red-500 hover:bg-red-400 w-2/3'
                >
                  Thêm vào giỏ hàng
                </button>
                <button className='px-6 py-2 text-xl inline font-bold ml-3 text-white rounded-lg bg-blue-500 w-1/3`'>
                  So sánh
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
            <div className='p-4 mt-5 bg-white rounded-3xl shadow-lg'>
              <textarea
                className='rounded-lg'
                cols='100'
                rows='3'
                placeholder='Hãy để lại cảm nghĩ của bạn về sản phẩm'
                ref={commentRef}
              ></textarea>
              <br />
              <button className='px-4 py-2 bg-blue-500 text-white mb-3 rounded-lg font-bold' onClick={handleComment}>
                Bình luận
              </button>
              {reviews &&
                reviews.map((item, index) => {
                  return (
                    <div key={index}>
                      <section style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <img src='https://picsum.photos/50/50' alt='reviewer avatar' className='rounded-full' />
                        <p className='font-medium text-lg' style={{ marginBottom: '18px' }}>
                          @{user.username}
                        </p>
                        <small style={{ margin: '0 0 16px 8px', color: '#919191' }}>
                          {moment(item.createdAt).fromNow()}
                        </small>
                      </section>
                      <section style={{ marginTop: '-22px' }}>
                        <span style={{ marginLeft: '56px' }}>{item.review.comment}</span>
                      </section>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Detail;
