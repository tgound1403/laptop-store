export const useGetUser = () => {
  const getAllUser = async () => {
    const response = await fetch(`/api/user`);
    const json = await response.json();
    return json;
  };

  const getSpecificUSer = async (id) => {
    const response = await fetch(`/api/user/${id}`);
    const json = await response.json();
    return json;
  };

  const updateUserRole = async (id, role) => {
    const response = await fetch(`/api/user/role/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role }),
    });
    const json = await response.json();
    return json;
  };

  const deleteSpecificUser = async (id) => {
    const response = await fetch(`api/user/${id}`, {
      method: 'DELETE',
    });
    const json = await response.json();
    return json;
  };

  return { getAllUser, getSpecificUSer, deleteSpecificUser, updateUserRole };
};
