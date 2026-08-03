export interface Category {
  id: number;
  name: string;
  description?: string;
  count: number;
}

export interface CategoryFormData {
  name: string;
  description: string;
}