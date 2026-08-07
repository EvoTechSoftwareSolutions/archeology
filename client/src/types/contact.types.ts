export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "unread" | "read" | "replied";
  createdAt: string;
}

export interface ContactStats {
  total: number;
  unread: number;
  read: number;
  replied: number;
}

export interface CreateContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}