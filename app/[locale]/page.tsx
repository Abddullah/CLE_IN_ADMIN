'use client'

import { useState, FormEvent } from 'react';
import Image from "next/image";
import { Link } from '@/i18n/routing';
import { useRouter } from "next/navigation";
import { useTranslations } from 'next-intl';
import { db  , auth} from './config/Firebase/FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, DocumentSnapshot } from 'firebase/firestore';

interface UserData {
  role: string;
}

const LoginScreen = () => {
  const t = useTranslations('loginPage');
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // Sign in user with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check the user's role in Firestore
      const userDocRef = doc(db, 'users', user.uid); // Assuming users are stored in Firestore under 'users'
      const userDocSnap = await getDoc(userDocRef);

if (userDocSnap.exists()) {
  const userData = userDocSnap.data() as UserData; // Type assertion here
  // Proceed with userData
} else {
  setError('User not found');
}



      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();

        // Check if the user is an admin
        if (userData?.role === 'admin') {
          // Redirect to dashboard if the role is admin
          router.push("/en/dashboard");
        } else {
          // Show error if not an admin
          setError('Only admin can access this page');
        }
      } else {
        setError('User not found');
      }
    } catch (error) {
      // Catch any errors and set error message
      setError('Incorrect email or password');
    }
  };

  return (
    <div className="min-h-screen flex bg-[#00BFFF]">
      {/* Left Section - Welcome Admin (Visible only on larger screens) */}
      <div className="hidden md:flex w-1/2 flex-col justify-center items-center text-white p-10">
        <h1 className="text-5xl font-extrabold mb-4">{t('welcome_admin')}</h1>
        <p className="text-xl font-medium mb-6">{t('manage_platform')}</p>
        <Image
          src="/assets/security-log.gif"
          alt={t("company_logo_alt")}
          width={200}
          height={120}
          className="object-contain"
        />
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-white px-2 py-10 sm:px-10">
        <div className="w-full max-w-lg bg-white rounded-xl shadow-lg border border-gray-400 p-8 sm:p-12">
          {/* Logo at the top of the form */}
          <div className="flex justify-center mb-6">
            <Image
              src="/assets/Logo.png"
              alt="Company Logo"
              width={70}
              height={70}
              className="object-contain"
            />
          </div>

          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-4">{t("admin_login")}</h2>
          <p className="text-center text-gray-600 mb-6">{t('enter_credentials')}</p>

          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Email Input */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">{t('email_address')}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00BFFF] transition duration-300"
                placeholder={t('enter_email')}
                required
              />
            </div>

            {/* Password Input */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">{t('password')}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00BFFF] transition duration-300"
                placeholder={t('enter_password')}
                required
              />
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* Login Button */}
            <button
              type="submit"
              className="w-full mt-3 py-3 text-white bg-[#00BFFF] rounded-lg shadow-lg hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 transform hover:scale-100 font-semibold"
            >
              {t('login_button')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
