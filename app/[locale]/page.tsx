"use client";

import { useState, FormEvent, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { db, auth } from "./config/Firebase/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import getFirebaseErrorMessage from "../firebaseErrorHandler";

interface UserData {
  role: any;
}

const LoginScreen = () => {
  const t = useTranslations("loginPage");
  const router = useRouter();
  const path = usePathname();
  let [email, setEmail] = useState<string>("");
  let [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  //only for development
  useEffect(() => {
    setEmail("admin@puliziedicasa.com");
    setPassword("12345678");
  }, []);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data() as UserData;
        localStorage.setItem("currentUser", JSON.stringify(userData));

        if (userData.role === "admin") {
          router.push("/en/dashboard");
        } else {
          setError("Only admin can access this page");
        }
      }
    } catch (error: any) {
      const errorCode = error.code;
      const languageCode = path.replace("/", "");
      const errorMessage = await getFirebaseErrorMessage(
        errorCode,
        languageCode
      );

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#00BFFF]">
      <div className="hidden md:flex w-1/2 flex-col justify-center items-center text-white p-10">
        <h1 className="text-5xl font-extrabold mb-4">{t("welcome_admin")}</h1>
        <p className="text-xl font-medium mb-6">{t("manage_platform")}</p>
        <Image
          src="/assets/security-log.gif"
          alt={t("company_logo_alt")}
          width={200}
          height={120}
          className="object-contain"
        />
      </div>

      <div className="w-full md:w-1/2 flex justify-center items-center bg-white px-2 py-10 sm:px-10">
        <div className="w-full max-w-lg bg-white rounded-xl shadow-lg border border-gray-400 p-8 sm:p-12">
          <div className="flex justify-center mb-6">
            <Image
              src="/assets/Logo.png"
              alt="Company Logo"
              width={70}
              height={70}
              className="object-contain"
            />
          </div>

          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-4">
            {t("admin_login")}
          </h2>
          <p className="text-center text-gray-600 mb-6">
            {t("enter_credentials")}
          </p>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">
                {t("email_address")}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00BFFF] transition duration-300"
                placeholder={t("enter_email")}
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">
                {t("password")}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00BFFF] transition duration-300"
                placeholder={t("enter_password")}
                required
              />
            </div>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-3 py-3 text-white bg-[#00BFFF] rounded-lg shadow-lg hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 transform hover:scale-100 font-semibold flex items-center justify-center"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="spinner-border animate-spin w-5 h-5 border-4 rounded-full border-t-transparent"></div>
                  <span>{t("loading")}</span>
                </div>
              ) : (
                t("login_button")
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
