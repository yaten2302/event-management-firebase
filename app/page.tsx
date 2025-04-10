"use client";

import Button from "@/components/form/Button";
import { firebaseAuth } from "@/firebase/firebase";
import {
  createBookingRequest,
  fetchAvailableVenues,
} from "@/lib/database/actions";
import { RequestStatus, Venue } from "@/types/database/database";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [venues, setAvailableVenues] = useState<Venue[]>([]);
  const [selectedVenue, setSelectedVenue] = useState<string>("");
  const [uid, setUid] = useState<string>("");
  const [eventDate, setEventDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        router.push("/signin");
      }
    });
  }, [router]);

  useEffect(() => {
    async function getVenues() {
      const venuesArr = await fetchAvailableVenues();
      setAvailableVenues(venuesArr);
    }

    getVenues();
  }, []);

  const handleSubmit = async () => {
    if (!selectedVenue || !eventDate || !startTime || !endTime) {
      console.log("all fields empty");

      return;
    }

    const bookingData = {
      venueName: selectedVenue,
      requestedBy: uid,
      teacherApproval: "pending" as RequestStatus,
      cooApproval: "pending" as RequestStatus,
      eventDate,
      startTime,
      endTime,
      createdAt: new Date().toString(),
    };

    try {
      await createBookingRequest(bookingData);
      console.log("Booking request submitted!");
    } catch (error) {
      console.log(error);
    }
  };

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

      <div className="mb-4">
        <label>Select an available venue:</label>
        <select
          value={selectedVenue}
          onChange={(e) => setSelectedVenue(e.target.value)}
          className="border px-3 py-2 rounded-md w-full max-w-xs"
        >
          <option value="">-- Choose Venue --</option>
          {venues.map((venue) => (
            <option key={venue.name} value={venue.name}>
              {venue.name}
            </option>
          ))}
        </select>
      </div>

      <p>event data:</p>
      <input
        type="date"
        value={eventDate}
        onChange={(e) => setEventDate(e.target.value)}
        className="mb-2 border px-3 py-2 rounded-md block"
      />

      <p>Start time:</p>
      <input
        type="time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        className="mb-2 border px-3 py-2 rounded-md block"
      />

      <p>End time:</p>
      <input
        type="time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        className="mb-4 border px-3 py-2 rounded-md block"
      />

      <Button onClick={handleSubmit}>Submit Booking Request</Button>
    </main>
  );
}
