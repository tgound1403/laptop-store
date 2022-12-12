export const useGetProducts = () => {
  const getProducts = async () => {
    const response = await fetch('http://localhost:4000/api/product/');
    const json = await response.json();
    return json;
  };

  const getProductByID = async (id) => {
    const response = await fetch(`http://localhost:4000/api/product/id/${id}`);
    const json = await response.json();
    return json;
  };

  const getProductByQuery = async (query) => {
    const response = await fetch(`http://localhost:4000/api/product/query/${query}`);
    const json = await response.json();
    return json;
  };

  const getProductPerPage = async (page) => {
    const response = await fetch(`http://localhost:4000/api/product/pagination?page=${page}`);
    const json = await response.json();
    return json;
  };

  const postProduct = async (form) => {
    const response = await fetch(`http://localhost:4000/api/product`, {
      method: 'POST',
      body: form,
    });
    const json = await response.json();
    return json;
  };

  const deleteProduct = async (id) => {
    const response = await fetch(`http://localhost:4000/api/product/${id}`, {
      method: 'DELETE',
    });
    const json = await response.json();
    return json;
  };

  const updateProduct = async (id, form) => {
    const response = await fetch(`http://localhost:4000/api/product/${id}`, {
      method: 'PUT',
      body: form,
    });
    const json = await response.json();
    response.ok ? console.log('put success') : console.log(`put fail`);
    return json;
  };

  return {
    getProducts,
    getProductByID,
    getProductByQuery,
    getProductPerPage,
    postProduct,
    deleteProduct,
    updateProduct,
  };
};
