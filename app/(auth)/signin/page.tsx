"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";

import Button from "@/components/form/Button";
import Input from "@/components/form/Input";
import NextImage from "@/components/Image";
import NextLink from "@/components/Link";

import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "@/firebase/firebase";

export default function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const path = usePathname();

  React.useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user && (path == "/signin" || path == "/signup")) {
        router.push("/");
      }
    });
  }, [path, router]);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((authUser) => {
        console.log("success" + authUser.user?.email);
        router.push("/");
      })
      .catch((error) => {
        console.log("error " + error);
      });
  };

  return (
    <main className="bg-[#F1F4FA] flex flex-row h-screen w-screen">
      <div className="bg-white w-[448px] flex flex-col p-8 gap-6">
        <div className="mb-8 self-center">
          <NextImage
            src="/logo.svg"
            alt="logo"
            width={65}
            height={65}
            className="pb-4"
          />
          <h1 className="font-medium text-TitleLarge">Sign In</h1>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <form onSubmit={handleSignIn}>
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium" htmlFor="email">
                Email
              </label>
              <Input
                type="email"
                name="email"
                className="w-full border mt-[.75rem]"
                placeholder="you@example.com"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium" htmlFor="password">
                Password
              </label>
              <Input
                type="password"
                name="password"
                className="w-full border mt-[.75rem]"
                placeholder="************"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="text-right mb-4">
              <NextLink
                href="/forgot-password"
                className="text-sm text-primary hover:underline font-medium"
                underline={true}
              >
                Forgot Password?
              </NextLink>
            </div>
          </div>

          <Button type="submit">Log in</Button>
        </form>

        <div className="mt-4 text-center text-sm flex justify-center gap-[.25rem]">
          <p className="text-[#788B9A]">Don&apos;t have an account?</p>
          <NextLink href="/signup" underline={true}>
            Sign up
          </NextLink>
        </div>
      </div>

      <div className="flex justify-center items-center h-screen w-[calc(100%-448px)]">
        <NextImage
          src="/sign_in_img_light.svg"
          alt="Sign In Illustration"
          width={500}
          height={500}
          className="w-[auto] h-[auto]"
        />
      </div>
    </main>
  );
}
