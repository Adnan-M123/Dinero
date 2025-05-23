// pages/login.js

'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation for app directory
// import '../styles/index.css'; // Adjust path if needed

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [staySignedIn, setStaySignedIn] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Validate email format
  const validateEmail = () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.match(emailPattern)) {
      setEmailError('Please enter a valid email address.');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  // Validate password format
  const validatePassword = () => {
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!password.match(passwordPattern)) {
      setPasswordError(
        'Password must be at least 6 characters, contain a number, and a capital letter.'
      );
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  // Handle form submission
  const handleSubmit = e => {
    e.preventDefault();
    const validEmail = validateEmail();
    const validPassword = validatePassword();

    if (!validEmail || !validPassword) {
      return;
    }

    // Redirect to homepage after successful login
    router.push('/');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F5F6FA]">
      <div className="w-[370px] h-[700px] bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center mb-1 mt-5">
          <img src="/Dinero-logo-green.png" alt="Dinero logo" className="mx-auto w-[110px]" />
        </div>

        <h1 className="text-4xl font-serif text-[#283618] text-center mb-4">Sign in</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm text-[#283618]">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-3 mt-1 border border-[#CDC1A5] rounded-full focus:outline-none focus:border-[#283618] text-[#283618]"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onBlur={validateEmail}
            />
            {emailError && <span className="text-xs text-red-500">{emailError}</span>}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm text-[#283618]">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-3 mt-1 border border-[#CDC1A5] rounded-full focus:outline-none focus:border-[#283618] text-[#283618]"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onBlur={validatePassword}
            />
            {passwordError && <span className="text-xs text-red-500">{passwordError}</span>}
          </div>

          <div className="flex justify-end">
            <a href="#" className="text-sm text-[#283618] hover:underline">
              Forgot password?
            </a>
          </div>

          <div className="flex items-center my-4">
            <input
              type="checkbox"
              id="stay-signed-in"
              name="staySignedIn"
              className="mr-2 accent-[#283618]"
              checked={staySignedIn}
              onChange={() => setStaySignedIn(!staySignedIn)}
            />
            <label htmlFor="stay-signed-in" className="text-sm text-[#283618]">
              Do you want to stay signed in?
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-6 bg-[#283618] text-white rounded-full hover:bg-white hover:text-[#283618] border-2 border-[#283618] transition"
          >
            Sign in
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-[#283618]">
          <span>By signing in, you agree to the </span>
          <a href="#" className="text-[#283618] underline hover:text-[#CDC1A5]">
            Terms of Service
          </a>{' '}
          <span>and </span>
          <a href="#" className="text-[#283618] underline hover:text-[#CDC1A5]">
            Privacy Policy
          </a>
          .
        </div>

        <p className="text-center mt-4 text-sm text-[#283618]">
          <span>New to Dinero? </span>
          <Link href={'/signup'}>
            <span className="text-[#283618] font-bold hover:underline">Signup</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
