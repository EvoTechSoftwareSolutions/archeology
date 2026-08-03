import { useEffect, useState } from "react";

import { categoryService } from "../services/category.service";

import type { Category } from "../types/category.types";

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const data = await categoryService.getCategories();

      setCategories(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,

    loading,

    reload: fetchCategories,

    create: categoryService.createCategory,

    update: categoryService.updateCategory,

    remove: categoryService.deleteCategory,
  };
};
