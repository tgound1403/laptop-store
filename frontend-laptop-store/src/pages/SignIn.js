import Header from '../components/Header';
import { useRef } from 'react';
import { useLogin } from '../hooks/useLogin';

const SignIn = () => {
  const username = useRef();
  const passwordRef = useRef();
  const { login, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username.current.value, passwordRef.current.value);
  };

  return (
    <>
      <Header />
      <div className='h-screen w-full bg-slate-200 flex align-middle justify-center items-center'>
        <form className='bg-white shadow-md rounded-3xl px-8 pt-6 pb-8 w-1/4 h-auto'>
          <h1 className='font-bold text-3xl text-blue-700 mb-'>Login</h1>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>Username</label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='username'
              type='text'
              placeholder='abc'
              ref={username}
            />
          </div>
          <div className='mb-6'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>Password</label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
              id='password'
              type='password'
              placeholder='Abc123#'
              ref={passwordRef}
            />
            {error && <p className='text-red-500 text-md italic'>{error}</p>}
          </div>
          <div className='flex items-center justify-between'>
            <button
              className='bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              onClick={handleSubmit}
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignIn;
