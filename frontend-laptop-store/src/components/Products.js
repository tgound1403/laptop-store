import { useState, useEffect } from 'react';
import { useGetProducts } from '../hooks/useGetProducts';
import ProductItem from './ProductItem';

export default function Products({ page }) {
  const [product, setProduct] = useState(null);
  const { getProductPerPage } = useGetProducts();

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductPerPage(page);
      setProduct(data);
    };

    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  return (
    <div className='flex gap-10 flex-wrap'>
      {product && product.map((item, index) => <ProductItem key={index} item={item} />)}
    </div>
  );
}
