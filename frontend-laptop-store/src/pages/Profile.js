import { useState, useRef } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useUpdateAccount } from '../hooks/useUpdateAccount';
import Header from '../components/Header';
const moment = require('moment');

export default function Profile() {
  const { user } = useAuthContext();
  const userNameRef = useRef();
  const emailRef = useRef();
  const phoneNumberRef = useRef();
  const passwordRef = useRef();
  const { updateAccount, error } = useUpdateAccount();
  const [showMessage, setShowMessage] = useState(false);

  const handleSubmit = async () => {
    await updateAccount(
      userNameRef.current.value,
      passwordRef.current.value,
      phoneNumberRef.current.value,
      emailRef.current.value,
    );
    userNameRef.current.value = '';
    passwordRef.current.value = '';
    phoneNumberRef.current.value = '';
    emailRef.current.value = '';
    setShowMessage(true);
  };

  return (
    <>
      <Header />
      <div className='px-96 py-12 bg-slate-200'>
        {user && (
          <>
            <p className='ml-8 font-bold text-3xl'>Profile</p>
            <div className='flex flex-row gap-8 p-8'>
              <section className='w-2/5'>
                <div className='mb-4'>
                  <img
                    src='https://avatars.githubusercontent.com/u/84559078?v=4'
                    alt='preview avatar'
                    className='w-full rounded-lg'
                  />
                </div>
                <div className='bg-white rounded-xl shadow-lg p-4'>
                  <div className='mb-4'>
                    <span className='mr-20 font-medium'>Status</span>
                    <span className='bg-green-500 px-2 py-1 rounded-lg text-white'>Active</span>
                  </div>
                  <div>
                    <span className=' font-medium mr-10'>Member Since</span>
                    <span>{moment(user.createdAt).fromNow()}</span>
                  </div>
                </div>
              </section>
              <section>
                <div className='mb-4'>
                  <h1 className='font-bold text-xl'>Profile Info</h1>
                </div>
                <div className='bg-white rounded-xl shadow-lg p-4'>
                  <div className='flex items-center gap-8 mb-4'>
                    <span className='font-medium'>Name</span>
                    <span className='w-4/5 px-2 py-1'>{user.username}</span>
                  </div>
                  <div className='flex items-center gap-8 mb-4'>
                    <span className='font-medium'>Email </span>
                    <span className='w-4/5 px-2 py-1'>{user.email}</span>
                  </div>
                  <div className='flex items-center gap-8'>
                    <span className='font-medium'>Phone</span>
                    <span className='w-4/5 px-2 py-1'>{`0${user.phoneNumber}`} </span>
                  </div>
                </div>
                <div className='my-4'>
                  <h1 className='font-bold text-xl'>Edited</h1>
                </div>
                <div className='bg-white rounded-xl shadow-lg p-4'>
                  <div className='flex items-center gap-8 mb-4'>
                    <label htmlFor='username'>Name</label>
                    <input
                      type='text'
                      id='userName'
                      ref={userNameRef}
                      className='w-4/5 px-2 py-1 border-none rounded-lg bg-slate-100'
                    />
                    <i
                      className='fa-solid fa-pencil p-4 bg-blue-400 rounded-full text-white'
                      onClick={() => userNameRef.current.focus()}
                    ></i>
                  </div>
                  <div className='flex items-center gap-8 mb-4 disabled'>
                    <label htmlFor='email'>Email </label>
                    <input
                      type='text'
                      id='email'
                      ref={emailRef}
                      className='w-4/5 px-2 py-1 border-none rounded-lg bg-slate-100'
                    />
                    <i
                      className='fa-solid fa-pencil p-4 bg-blue-400 rounded-full text-white'
                      onClick={() => emailRef.current.focus()}
                    ></i>
                  </div>
                  <div className='flex items-center gap-8'>
                    <label htmlFor='phone'>Phone</label>
                    <input
                      type='text'
                      id='phone'
                      ref={phoneNumberRef}
                      className='w-4/5 px-2 py-1 border-none rounded-lg bg-slate-100'
                    />
                    <i
                      className='fa-solid fa-pencil p-4 bg-blue-400 rounded-full text-white'
                      onClick={() => phoneNumberRef.current.focus()}
                    ></i>
                  </div>
                  <input
                    type='text'
                    placeholder='please enter password to confirm'
                    ref={passwordRef}
                    className='w-4/5 px-2 py-1 border-none rounded-lg bg-slate-100 my-4'
                  />
                  <br />
                  {error && <small style={{ color: 'red' }}>Incorrect password</small>}
                  <button className='text-white bg-green-500 px-4 py-2 rounded-lg mt-4' onClick={handleSubmit}>
                    <i className='fa-solid fa-check mr-8'></i>
                    Submit
                  </button>
                </div>
                <br />
                {showMessage && <small style={{ color: '#1fae66' }}>Save data successfully</small>}
              </section>
            </div>
          </>
        )}
      </div>
    </>
  );
}
