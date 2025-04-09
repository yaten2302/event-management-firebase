"use server";

import { firebaseAuth } from "@/firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { redirect } from "next/navigation";

export async function signUp(formData: FormData) {
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  await createUserWithEmailAndPassword(firebaseAuth, data.email, data.password);

  redirect("/signin");
}
