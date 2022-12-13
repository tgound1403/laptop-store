import Header from '../components/Header';

export default function Create() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = document.querySelector('#form');
    const postProduct = await fetch(`http://localhost:4000/api/product`, {
      method: 'POST',
      body: new FormData(form),
    });
    postProduct();
  };

  return (
    <>
      <Header />
      <div className='bg-slate-200 px-96 py-12'>
        <h1 className='font-bold text-3xl'>Add Product</h1>
        <form id='form' encType='multipart/form-data' onSubmit={handleSubmit}>
          <label className='block text-gray-700 text-sm font-bold mb-2'>Name</label>
          <input type='text' name='name' placeholder='name' className='border-none rounded-lg px-2 py-1' />
          <label className='block text-gray-700 text-sm font-bold mb-2'>Brand</label>
          <input type='text' name='brand' placeholder='brand' className='border-none rounded-lg px-2 py-1' />
          <label className='block text-gray-700 text-sm font-bold mb-2'>Price</label>
          <input type='text' name='price' placeholder='price' className='border-none rounded-lg px-2 py-1' />
          <label className='block text-gray-700 text-sm font-bold mb-2'>Color</label>
          <input type='text' name='color' placeholder='color' className='border-none rounded-lg px-2 py-1' />
          <label className='block text-gray-700 text-sm font-bold mb-2'>Tags</label>
          <input type='text' name='tags' placeholder='tags' className='border-none rounded-lg px-2 py-1' />
          <label className='block text-gray-700 text-sm font-bold mb-2'>Image</label>
          <input type='file' name='image' required />
          <input type='submit' className='px-4 py-2 font-bold text-white text-xl bg-blue-700 hover:bg-blue-500' />
        </form>
      </div>
    </>
  );
}
