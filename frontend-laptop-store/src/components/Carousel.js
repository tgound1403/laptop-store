import "tw-elements";
const Carousel = () => {
  return (
    <div
      id="carouselExampleCrossfade"
      class="carousel slide carousel-fade relative w-full rounded-lg"
      data-bs-ride="carousel"
    >
      <div class="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
        <button
          type="button"
          data-bs-target="#carouselExampleCrossfade"
          data-bs-slide-to="0"
          class="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCrossfade"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCrossfade"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div class="carousel-inner relative w-full overflow-hidden rounded-xl">
        <div class="carousel-item active float-left w-full">
          <img
            src="https://media-api-beta.thinkpro.vn/media/core/banners/2022/8/5/B%E1%BA%A3n%20sao%20Resize%201.jpg"
            class="block w-full"
            alt="Wild Landscape"
          />
        </div>
        <div class="carousel-item float-left w-full">
          <img
            src="https://media-api-beta.thinkpro.vn/media/core/banners/2022/10/18/Lenovo%20Day%20866x374-05-2.jpg"
            class="block w-full"
            alt="Camera"
          />
        </div>
        <div class="carousel-item float-left w-full">
          <img
            src="https://media-api-beta.thinkpro.vn/media/core/banners/2022/12/1/banner%20(3).png"
            class="block w-full"
            alt="Exotic Fruits"
          />
        </div>
      </div>
      <button
        class="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
        type="button"
        data-bs-target="#carouselExampleCrossfade"
        data-bs-slide="prev"
      >
        <span
          class="carousel-control-prev-icon inline-block bg-no-repeat"
          aria-hidden="true"
        ></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
        type="button"
        data-bs-target="#carouselExampleCrossfade"
        data-bs-slide="next"
      >
        <span
          class="carousel-control-next-icon inline-block bg-no-repeat"
          aria-hidden="true"
        ></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
