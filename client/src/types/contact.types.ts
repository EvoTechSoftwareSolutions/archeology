export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "unread" | "read" | "archived";
  createdAt: string;
}


export interface ContactStats {
  total: number;
  unread: number;
  read: number;
  resolved: number;
}


export interface CreateContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}