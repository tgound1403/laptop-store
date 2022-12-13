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

      <section
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          gap: '2rem',
          background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',
          padding: '2rem',
        }}
      >
        {invoice && (
          <>
            <article style={{ flexBasis: '23rem' }}>
              <div>
                <h3>Invoice Information</h3>
              </div>
              <div>
                <div>
                  <h4>Invoice Code</h4>
                  <input disabled value={id} style={{ width: '100%', padding: '8px', borderRadius: '8px' }} />
                </div>
                <div>
                  <h4>Status</h4>
                  <select onChange={(e) => handleUpdateInvoiceStatus(e.target.value)}>
                    <option value={invoice.status}>{invoice.status ? 'Return' : 'Pending'}</option>
                    <option value={!invoice.status}>{invoice.status ? 'Pending' : 'Return'}</option>
                  </select>
                </div>
              </div>
            </article>
            {user && (
              <article style={{ flexBasis: '30rem' }}>
                <div>
                  <h3>Customer Information</h3>
                </div>
                <div>
                  <div>
                    <h4>Customer Name</h4>
                    <input
                      disabled
                      defaultValue='Trinh Cam Minh'
                      style={{ width: '100%', padding: '8px', borderRadius: '8px' }}
                    />
                  </div>
                  <div>
                    <h4>Email</h4>
                    <input
                      disabled
                      type='email'
                      defaultValue='trinhcamminh25112002@gmail.com'
                      style={{ width: '100%', padding: '8px', borderRadius: '8px' }}
                    />
                  </div>
                  <div>
                    <h4>Phone</h4>
                    <input
                      type='text'
                      disabled
                      defaultValue={user.phoneNumber}
                      style={{ width: '100%', padding: '8px', borderRadius: '8px' }}
                    />
                  </div>
                  <div>
                    <h4>Location</h4>
                    <input
                      type='text'
                      disabled
                      defaultValue='New York'
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
