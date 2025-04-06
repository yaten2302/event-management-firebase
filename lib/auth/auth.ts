"use server";

import { firebaseAuth } from "@/firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { redirect } from "next/navigation";

export async function signUp(formData: FormData) {
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  createUserWithEmailAndPassword(firebaseAuth, data.email, data.password)
    .then(() => {
      redirect("/signin");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorCode, errorMessage);

      return;
    });
}

export async function signIn(formData: FormData) {
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  signInWithEmailAndPassword(firebaseAuth, data.email, data.password)
    .then(() => {
      redirect("/home");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorCode, errorMessage);

      return;
    });
}

export async function signOutUser() {
  signOut(firebaseAuth)
    .then(() => {
      redirect("/signin");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorCode, errorMessage);

      return;
    });
}
