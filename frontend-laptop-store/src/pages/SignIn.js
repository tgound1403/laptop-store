import Header from '../components/Header';
import { useRef } from 'react';
import { useLogin } from '../hooks/useLogin';

const SignIn = () => {
  const userNameRef = useRef();
  const passwordRef = useRef();
  const { login, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(userNameRef.current.value, passwordRef.current.value);
  };

  return (
    <>
      <Header />
      <div class='h-full w-full flex align-middle justify-center items-center'>
        <form class='bg-white shadow-md rounded px-8 pt-6 pb-8 w-1/2 h-1/2'>
          <div class='mb-4'>
            <label class='block text-gray-700 text-sm font-bold mb-2' for='username'>
              Username
            </label>
            <input
              class='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='username'
              type='text'
              placeholder='abc'
              ref={userNameRef}
            />
          </div>
          <div class='mb-6'>
            <label class='block text-gray-700 text-sm font-bold mb-2' for='password'>
              Password
            </label>
            <input
              class='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
              id='password'
              type='password'
              placeholder='Abc123#'
              ref={passwordRef}
            />
            {error && <p class='text-red-500 text-xs italic'>{error}</p>}
          </div>
          <div class='flex items-center justify-between'>
            <button
              class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              type='button'
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
