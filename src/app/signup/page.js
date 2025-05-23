// pages/signup.js

'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
// import './styles/index.css';



export default function SignupPage() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [repasswordError, setRepasswordError] = useState('');

  // Validate username
  const validateUsername = () => {
    if (!username.trim()) {
      setUsernameError('Username cannot be empty.');
      return false;
    }
    setUsernameError('');
    return true;
  };

  // Validate email format
  const validateEmail = () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.match(emailPattern)) {
      setEmailError('Please enter a valid email address.');
      return false;
    }
    setEmailError('');
    return true;
  };

  // Validate password format
  const validatePassword = () => {
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!password.match(passwordPattern)) {
      setPasswordError(
        'Password must be at least 6 characters, contain a number, and a capital letter.'
      );
      return false;
    }
    setPasswordError('');
    return true;
  };

  // Validate password re-entry
  const validateRePassword = () => {
    if (password !== repassword) {
      setRepasswordError('Passwords do not match.');
      return false;
    }
    setRepasswordError('');
    return true;
  };

  // Handle form submission
  const handleSubmit = e => {
    e.preventDefault();

    const isUsernameValid = validateUsername();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isRePasswordValid = validateRePassword();

    if (isUsernameValid && isEmailValid && isPasswordValid && isRePasswordValid) {
      // If all validations pass, navigate to homepage
      router.push('/indexHomepageLoggedin.html'); // Adjust this route as needed
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-[370px] h-[700px] bg-white p-4 rounded-lg shadow-lg">
        <div className="text-center mb-1 mt-5">
          <img src="/Dinero-logo-green.png" alt="Dinero logo" className="mx-auto w-[110px]" />
        </div>

        <h1 className="text-3xl font-serif text-[#283618] text-center mb-3">Create Account</h1>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm text-gray-600">
              Username
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-2 mt-1 border border-gray-300 rounded-full"
              value={username}
              onChange={e => setUsername(e.target.value)}
              onBlur={validateUsername}
            />
            {usernameError && <span className="text-xs text-red-500">{usernameError}</span>}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-2 mt-1 border border-gray-300 rounded-full"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onBlur={validateEmail}
            />
            {emailError && <span className="text-xs text-red-500">{emailError}</span>}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-2 mt-1 border border-gray-300 rounded-full"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onBlur={validatePassword}
            />
            {passwordError && <span className="text-xs text-red-500">{passwordError}</span>}
          </div>

          {/* Re-enter Password */}
          <div className="mb-4">
            <label htmlFor="repassword" className="block text-sm text-gray-600">
              Re-enter password
            </label>
            <input
              type="password"
              id="repassword"
              name="repassword"
              className="w-full p-2 mt-1 border border-gray-300 rounded-full"
              value={repassword}
              onChange={e => setRepassword(e.target.value)}
              onBlur={validateRePassword}
            />
            {repasswordError && <span className="text-xs text-red-500">{repasswordError}</span>}
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-[#283618] text-white rounded-full hover:bg-white hover:text-[#2C3E53] border-2 border-[#2C3E53]"
          >
            Create account
          </button>
        </form>

        <div className="text-center mt-4 text-sm text-gray-600">
          <span>By creating an account, you agree to the </span>
          <a href="#" className="text-[#283618] hover:underline">
            Terms of Service
          </a>{' '}
          <span>and </span>
          <a href="#" className="text-[#283618] hover:underline">
            Privacy Policy
          </a>
          .
        </div>

        <p className="text-center mt-4 text-sm text-gray-600">
          <span>Already have an account? </span>
          <Link href={'/login'}>
            <span className="text-[#283618] font-bold hover:underline">Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
