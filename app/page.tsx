"use client";

import Button from "@/components/form/Button";
import { firebaseAuth } from "@/firebase/firebase";
import { fetchAvailableVenues } from "@/lib/database/actions";
import { Venue } from "@/types/database/database";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [venues, setAvailableVenues] = useState<Venue[]>([]);
  const [selectedVenue, setSelectedVenue] = useState<string>("");

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (!user) {
        console.log("User is logged out");
        router.push("/signin");
      }
    });
  }, [router]);

  useEffect(() => {
    async function getVenues() {
      const venuesArr = await fetchAvailableVenues();
      setAvailableVenues(venuesArr);
      console.log(venuesArr);
    }

    getVenues();
  }, []);

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">Home</h1>

      <Button
        onClick={() => {
          signOut(firebaseAuth);
          router.push("/signin");
        }}
        className="mb-6"
      >
        Sign out
      </Button>

      <div>
        <label htmlFor="venue" className="block font-medium mb-2">
          Select an available venue:
        </label>
        <select
          id="venue"
          value={selectedVenue}
          onChange={(e) => setSelectedVenue(e.target.value)}
          className="border px-3 py-2 rounded-md w-full max-w-xs"
        >
          <option value="">Choose Venue</option>
          {venues.map((venue) => (
            <option key={venue.name} value={venue.name}>
              {venue.name}
            </option>
          ))}
        </select>
      </div>
    </main>
  );
}
