// components/ProtectedRoute.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/Firebase/FirebaseConfig";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  
  const [user, setUser] = useState<null | { uid: string }>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/"); 
      } else {
        setUser(user);
      }
      
    });

    return () => unsubscribe();
  }, [router]);

  ;

  return <>{user ? children : null}</>;
}
