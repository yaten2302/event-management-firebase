"use client";

import Button from "@/components/form/Button";
import { useUser } from "@/contexts/userContext";
import { firebaseAuth } from "@/firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const user = useUser();
  console.log(user.role);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log("uid", uid);
      } else {
        console.log("user is logged out");
        router.push("/signin");
      }
    });
  }, [router]);

  return (
    <main>
      <h1>Sign out</h1>
      <Button
        onClick={() => {
          signOut(firebaseAuth);
          router.push("/signin");
        }}
      >
        Sign out
      </Button>
    </main>
  );
}
