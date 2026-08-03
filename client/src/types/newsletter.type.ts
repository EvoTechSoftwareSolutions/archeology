export interface Subscriber {
  id: number;
  email: string;
  status: string;
  createdAt: string;
}

export interface NewsletterStats {
  total: number;
  active: number;
}