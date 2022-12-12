export const useInvoice = () => {
  const getAllInvoice = async () => {
    const response = await fetch('/api/invoice');
    const json = await response.json();
    return json;
  };

  const getSpecificInvoice = async (id) => {
    const response = await fetch(`/api/invoice/${id}`);
    const json = await response.json();
    return json;
  };

  const postInvoice = async (userID, total, productID) => {
    const response = await fetch('/api/invoice/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userID, total, productID }),
    });
    const json = await response.json();
    return json;
  };

  const removeSpecificInvoice = async (id) => {
    const response = await fetch(`/api/invoice/${id}`, {
      method: 'DELETE',
    });
    const json = await response.json();
    return json;
  };

  const updateInvoice = async (id, status) => {
    const response = await fetch(`/api/invoice/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    const json = await response.json();
    return json;
  };

  return { getAllInvoice, getSpecificInvoice, postInvoice, removeSpecificInvoice, updateInvoice };
};
