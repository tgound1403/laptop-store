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

      <form id='form' encType='multipart/form-data' onSubmit={handleSubmit}>
        <input type='text' name='name' placeholder='name' />
        <input type='text' name='brand' placeholder='brand' />
        <input type='text' name='price' placeholder='price' />
        <input type='text' name='color' placeholder='color' />
        <input type='text' name='tags' placeholder='tags' />
        <input type='file' name='image' required />
        <input type='submit' />
      </form>
    </>
  );
}
