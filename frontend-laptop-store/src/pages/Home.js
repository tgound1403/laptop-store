import Header from '../components/Header';
import Carousel from '../components/Carousel';
import Products from '../components/Products';
const Home = () => {
  let brandList = ['Apple', 'Dell', 'MSI', 'Lenovo', 'Asus', 'LG', 'Gigabyte', 'HP'];

  let laptopType = ['Laptop văn phòng', 'Laptop đồ họa', 'Laptop gaming', 'Macbook'];

  return (
    <>
      <Header />
      <div className='flex gap-3 py-2 border-b px-96'>
        {laptopType.map((type) => {
          return (
            <div className='rounded-lg font-bold  hover:bg-slate-100 px-8 py-4 transition duration-150 ease-in-out'>
              {type}
            </div>
          );
        })}
      </div>
      <div className='px-96 py-4'>
        <div className='flex justify-center mt-3'>
          <Carousel />
          <div className='flex-col gap-5 w-2/5 pl-4'>
            <div className='bg-slate-50 h-28 mb-2 rounded-xl py-2 px-4'>
              <p className='font-bold text-xl mb-3'>Miễn phí vận chuyển</p>
              <p className='text-md'>100% đơn hàng đều được miễn phí vận chuyển khi thanh toán trước.</p>
            </div>
            <div className='bg-slate-50 h-28 mb-2 rounded-xl py-2 px-4'>
              <p className='font-bold text-xl mb-3'>Bảo hành tận tâm</p>
              <p className='text-md'>Bất kể giấy tờ thế nào, DStore luôn cam kết sẽ hỗ trợ khách hàng tới cùng.</p>
            </div>
            <div className='bg-slate-50 h-28 mb-2 rounded-xl py-2 px-4'>
              <p className='font-bold text-xl mb-3'>Đổi trả 1-1 hoặc hoàn tiền</p>
              <p className='text-md'>Nếu phát sinh lỗi hoặc bạn cảm thấy sản phẩm chưa đáp ứng được nhu cầu.</p>
            </div>
          </div>
        </div>
        <nav></nav>
        <p className='font-bold text-xl mt-5'>Thương hiệu nổi bật</p>
        <div className='flex gap-3 py-2'>
          {brandList.map((brand) => {
            return (
              <div className='rounded-lg border-slate-100 hover:bg-slate-100 transition duration-150 ease-in-out border px-8 py-4'>
                {brand}
              </div>
            );
          })}
        </div>
      </div>
      <div className='bg-slate-100 px-96 py-4'>
        <p className='font-bold text-3xl mt-5 mb-2'>Tất cả laptop</p>
        <Products />
      </div>
    </>
  );
};

export default Home;
