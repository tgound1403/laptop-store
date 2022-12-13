import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProducts } from '../hooks/useGetProducts';
import ProductItem from '../components/ProductItem';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

export default function Search() {
  const { getProductByQuery } = useGetProducts();
  const [product, setProduct] = useState(null);
  const { query } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductByQuery(query);
      setProduct(data);
    };
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <>
      <Header />
      <div className='bg-slate-200 px-96 py-12'>
        <Link to='/'>
          <p className='text-lg text-blue-700 mb-3'>Trở về trang chủ</p>
        </Link>
        <h1 className='font-bold text-3xl'>Kết quả tìm kiếm</h1>
        <div className='p-5 flex flex-wrap justify-start gap-5 items-start '>
          {product && product.map((item, index) => <ProductItem key={index} item={item} />)}
        </div>
      </div>
    </>
  );
}
