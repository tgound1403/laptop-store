import Header from "../components/Header";
import Carousel from "../components/Carousel";
const Home = () => {
  let brandList = [
    "Apple",
    "Dell",
    "MSI",
    "Lenovo",
    "Asus",
    "LG",
    "Gigabyte",
    "HP",
  ];

  let mockLaptopData = [
    { name: "Lenovo ThinkPad X1 Nano Gen 2", price: "26.990.000" },
    { name: "Macbook Air M1", price: "21.990.000" },
    { name: "Macbook Air M2", price: "27.990.000" },
    { name: "Macbook Pro M1", price: "31.990.000" },
    { name: "Macbook Pro M2", price: "37.990.000" },
  ];

  let laptopType = [
    "Laptop văn phòng",
    "Laptop đồ họa",
    "Laptop gaming",
    "Macbook",
  ];

  return (
    <>
      <Header />
      <div className="flex gap-3 py-2 border-b px-96">
        {laptopType.map((type) => {
          return (
            <div className="rounded-lg font-bold  hover:bg-slate-100 px-8 py-4 transition duration-150 ease-in-out">
              {type}
            </div>
          );
        })}
      </div>
      <div className="px-96 py-4">
        <div className="flex justify-center mt-3">
          <Carousel />
          <div className="flex-col gap-5 w-2/5 pl-4">
            <div className="bg-slate-50 h-28 mb-2 rounded-xl py-2 px-4">
              <p className="font-bold text-xl mb-3">Miễn phí vận chuyển</p>
              <p className="text-md">
                100% đơn hàng đều được miễn phí vận chuyển khi thanh toán trước.
              </p>
            </div>
            <div className="bg-slate-50 h-28 mb-2 rounded-xl py-2 px-4">
              <p className="font-bold text-xl mb-3">Bảo hành tận tâm</p>
              <p className="text-md">
                Bất kể giấy tờ thế nào, DStore luôn cam kết sẽ hỗ trợ khách hàng
                tới cùng.
              </p>
            </div>
            <div className="bg-slate-50 h-28 mb-2 rounded-xl py-2 px-4">
              <p className="font-bold text-xl mb-3">
                Đổi trả 1-1 hoặc hoàn tiền
              </p>
              <p className="text-md">
                Nếu phát sinh lỗi hoặc bạn cảm thấy sản phẩm chưa đáp ứng được
                nhu cầu.
              </p>
            </div>
          </div>
        </div>
        <nav></nav>
        <p className="font-bold text-xl mt-5">Thương hiệu nổi bật</p>
        <div className="flex gap-3 py-2">
          {brandList.map((brand) => {
            return (
              <div className="rounded-lg border-slate-100 hover:bg-slate-100 transition duration-150 ease-in-out border px-8 py-4">
                {brand}
              </div>
            );
          })}
        </div>
      </div>
      <div className="bg-slate-100 px-96 py-4">
        <p className="font-bold text-3xl mt-5 mb-2">Tất cả laptop</p>
        <div className="flex gap-10 flex-wrap">
          {mockLaptopData.map((laptop) => {
            return (
              <div class="flex justify-center">
                <div class="rounded-3xl shadow-lg bg-white w-64">
                  <a
                    href="#!"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                  >
                    <img
                      class="rounded-t-3xl"
                      src="https://media-api-beta.thinkpro.vn/media/core/products/2022/1/15/Lenovo_ThinkPad_X1_Nano_Gen_2.png?w=500&h=500"
                      alt=""
                    />
                  </a>
                  <div class="p-6">
                    <h5 class="text-gray-900 text-xl font-medium mb-2">
                      {laptop.name}
                    </h5>
                    <p class="text-base mb-4">
                      Từ{" "}
                      <p className="text-red-600 font-bold inline">
                        {laptop.price}
                      </p>
                    </p>
                    <button
                      type="button"
                      class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    >
                      Thêm vào giỏ hàng
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
