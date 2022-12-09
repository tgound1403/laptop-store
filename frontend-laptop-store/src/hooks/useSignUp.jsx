import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

export const useSignUp = () => {
  const [error, setError] = useState(false);
  const { dispatch } = useAuthContext();

  const signUp = async (username, email, phoneNumber, password) => {
    const response = await fetch('http://localhost:4000/api/user/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, phoneNumber, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    } else {
      //save to local storage
      localStorage.setItem('user', JSON.stringify(json));

      //update state
      dispatch({ type: 'LOGIN', payload: json });

      console.log('signup successfully!!');
    }
  };
  return { error, signUp };
};
