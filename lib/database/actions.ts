import { fireStore } from "@/firebase/firebase";
import { BookingRequest, Venue } from "@/types/database/database";
import { getDocs, collection, addDoc } from "firebase/firestore";

export const fetchAvailableVenues = async (): Promise<Venue[]> => {
  const bookingSnap = await getDocs(collection(fireStore, "BookingRequest"));
  const bookedVenueNames = new Set<string>();

  const now = new Date();

  bookingSnap.forEach((docSnap) => {
    const data = docSnap.data() as BookingRequest;

    const eventEnd = new Date(`${data.eventDate}T${data.endTime}`);
    if (eventEnd > now) {
      bookedVenueNames.add(data.venueName);
    }
  });

  const venueSnap = await getDocs(collection(fireStore, "Venue"));
  const availableVenues: Venue[] = [];

  venueSnap.forEach((docSnap) => {
    const data = docSnap.data() as Venue;

    if (!bookedVenueNames.has(data.name)) {
      availableVenues.push({ name: data.name });
    }
  });

  return availableVenues;
};

export async function createBookingRequest(data: BookingRequest) {
  try {
    const docRef = await addDoc(collection(fireStore, "BookingRequest"), {
      ...data,
    });
    console.log("Document written with ID: ", docRef.id);

    return docRef.id;
  } catch (error) {
    console.error("Error creating booking request:", error);
    throw error;
  }
}
