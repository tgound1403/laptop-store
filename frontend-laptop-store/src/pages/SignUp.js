import { useRef } from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { useSignUp } from '../hooks/useSignUp';

const SignUp = () => {
  const { error, signUp } = useSignUp();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();
  const phoneNumberRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signUp(
      usernameRef.current.value,
      emailRef.current.value,
      phoneNumberRef.current.value,
      passwordRef.current.value,
    );
  };

  return (
    <>
      <Header />
      <div class='h-screen w-full flex align-middle justify-center items-center bg-slate-200'>
        <form class='bg-white shadow-md rounded-xl px-8 pt-6 pb-8 w-1/4 h-1/2'>
          <h1 className='font-bold text-3xl text-blue-700 mb-'>Sign up</h1>
          <div class='mb-4'>
            <label class='block text-gray-700 text-sm font-bold mb-2'>Username</label>
            <input
              class='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='username'
              type='text'
              placeholder='abc'
              ref={usernameRef}
            />
          </div>
          <div class='mb-4'>
            <label class='block text-gray-700 text-sm font-bold mb-2'>Email</label>
            <input
              class='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='username'
              type='email'
              placeholder='abc123@sample.com'
              ref={emailRef}
            />
          </div>
          <div class='mb-4'>
            <label class='block text-gray-700 text-sm font-bold mb-2'>Phone number</label>
            <input
              class='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='username'
              type='text'
              placeholder='0123456789'
              ref={phoneNumberRef}
            />
          </div>
          <div class='mb-6'>
            <label class='block text-gray-700 text-sm font-bold mb-2'>Password</label>
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
              class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline'
              type='submit'
              onClick={handleSubmit}
            >
              Sign Up
            </button>
          </div>
          <Link className='mt-3 mx-auto my-0' to='/signin'>
            <h1 className='text-blue-700 inline '>Already have an account? Sign in here</h1>
          </Link>
        </form>
      </div>
    </>
  );
};

export default SignUp;
