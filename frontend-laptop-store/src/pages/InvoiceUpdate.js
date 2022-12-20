import { useParams } from 'react-router-dom';
import { useInvoice } from '../hooks/useInvoice';
import { useGetUser } from '../hooks/useGetUser';
// import { useHistory } from '../hooks/useHistory';
import { useEffect, useState } from 'react';
import Header from '../components/Header';

export default function Update() {
  const { id } = useParams();
  const { getSpecificInvoice, updateInvoice } = useInvoice();
  //   const { postHistory } = useHistory();
  const { getSpecificUSer } = useGetUser();
  const [invoice, setInvoice] = useState(null);
  const [user, setUser] = useState(null);

  const fetchInvoice = async () => {
    const data = await getSpecificInvoice(id);
    setInvoice(data);
  };

  const fetchUser = async () => {
    const data = await getSpecificUSer(invoice.userID);
    setUser(data);
  };

  //   const CreateHistory = async (userID, productID) => {
  //     await postHistory(userID, productID);
  //   };

  const handleUpdateInvoiceStatus = async (status) => {
    await updateInvoice(id, status);
    if (status) {
      //   invoice.productID.map((item) => CreateHistory(invoice.userID, item));
    }
  };

  useEffect(() => {
    fetchInvoice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (invoice) fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoice]);

  return (
    <>
      <Header />

      <section className='flex justify-evenly gap-8 px-96 py-12 bg-slate-200'>
        {invoice && (
          <>
            <article style={{ flexBasis: '23rem' }}>
              <div>
                <h1 className='font-bold text-3xl'>Invoice Information</h1>
              </div>
              <div>
                <div>
                  <h3 className='font-medium text-lg'>Invoice Code</h3>
                  <input
                    className='bg-white'
                    disabled
                    value={id}
                    style={{ width: '100%', padding: '8px', borderRadius: '8px' }}
                  />
                </div>
                <div>
                  <h3 className='font-medium text-lg'>Status</h3>
                  <select onChange={(e) => handleUpdateInvoiceStatus(e.target.value)}>
                    <option value={invoice.status}>{invoice.status ? 'Đã hoàn tất' : 'Đang chờ'}</option>
                    <option value={!invoice.status}>{invoice.status ? 'Đang chờ' : 'Đã hoàn tất'}</option>
                  </select>
                </div>
              </div>
            </article>
            {user && (
              <article style={{ flexBasis: '30rem' }}>
                <div>
                  <h1 className='font-bold text-3xl'>Customer Information</h1>
                </div>
                <div>
                  <div>
                    <h4>Customer Name</h4>
                    <input
                      disabled
                      className='border-none'
                      type='text'
                      defaultValue='customer name'
                      style={{ width: '100%', padding: '8px', borderRadius: '8px' }}
                    />
                  </div>
                  <div>
                    <h4>Email</h4>
                    <input
                      disabled
                      className='border-none'
                      type='email'
                      defaultValue='customer email'
                      style={{ width: '100%', padding: '8px', borderRadius: '8px' }}
                    />
                  </div>
                  <div>
                    <h4>Phone</h4>
                    <input
                      type='text'
                      disabled
                      className='border-none'
                      defaultValue={user.phoneNumber}
                      style={{ width: '100%', padding: '8px', borderRadius: '8px' }}
                    />
                  </div>
                  <div>
                    <h4>Location</h4>
                    <input
                      type='text'
                      disabled
                      className='border-none'
                      defaultValue='Vietnam'
                      style={{ width: '100%', padding: '8px', borderRadius: '8px' }}
                    />
                  </div>
                </div>
              </article>
            )}
          </>
        )}
      </section>
    </>
  );
}
