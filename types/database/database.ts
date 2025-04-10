export type UserRole = "student" | "teacher" | "coo";

export interface User {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Venue {
  name: string;
}

export type RequestStatus = "pending" | "approved" | "rejected";

export interface BookingRequest {
  venueName: string;
  requestedBy: string;
  teacherApproval: RequestStatus;
  cooApproval: RequestStatus;
  eventDate: string;
  startTime: string;
  endTime: string;
  createdAt: string;
}
