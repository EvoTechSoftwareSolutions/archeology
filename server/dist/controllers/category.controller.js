import { categoryService } from "../services/category.service.js";
export const getCategories = async (req, res, next) => {
    try {
        const categories = await categoryService.getAllCategories();
        return res.status(200).json({
            success: true,
            count: categories.length,
            data: categories,
        });
    }
    catch (error) {
        next(error);
    }
};
export const createCategory = async (req, res, next) => {
    try {
        const category = await categoryService.createCategory(req.body);
        return res.status(201).json({
            success: true,
            message: "Category created successfully",
            data: category,
        });
    }
    catch (error) {
        next(error);
    }
};
export const updateCategory = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const category = await categoryService.updateCategory(id, req.body);
        return res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: category,
        });
    }
    catch (error) {
        next(error);
    }
};
export const deleteCategory = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        await categoryService.deleteCategory(id);
        return res.status(200).json({
            success: true,
            message: "Category deleted successfully",
        });
    }
    catch (error) {
        next(error);
    }
};
