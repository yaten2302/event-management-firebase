"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { firebaseAuth, fireStore } from "@/firebase/firebase";

interface UserContextType {
  uid: string;
  role: "student" | "teacher" | "coo" | null;
  loading: boolean;
}

const UserContext = createContext<UserContextType>({
  uid: "",
  role: null,
  loading: true,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [uid, setUid] = useState("");
  const [role, setRole] = useState<"student" | "teacher" | "coo" | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        setUid(user.uid);
        const docRef = doc(fireStore, "User", user.uid);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setRole(snap.data().role);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ uid, role, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
