"use server";

import { firebaseAuth } from "@/firebase/firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { redirect } from "next/navigation";

export async function signUp(formData: FormData) {
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  await createUserWithEmailAndPassword(firebaseAuth, data.email, data.password);

  redirect("/signin");
}

export async function signIn(formData: FormData) {
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  await signInWithEmailAndPassword(firebaseAuth, data.email, data.password);

  redirect("/");
}

export async function signOutUser() {
  try {
    await signOut(firebaseAuth);

    redirect("/signin");
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function retrieveUser() {
  const auth = getAuth();
  const user = auth.currentUser;
  console.log(user);

  if (user) {
    return user;
  } else {
    return undefined;
  }
}
