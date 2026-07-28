import type { Request, Response, NextFunction } from "express";
import { provinceService } from "../services/province.service.js";


// CREATE PROVINCE
export const createProvince = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {

    try {

        const province =
            await provinceService.createProvince(req.body);


        return res.status(201).json({

            success: true,

            message: "Province created successfully",

            data: province,

        });


    } catch (error) {

        next(error);

    }

};



// GET ALL PROVINCES
export const getProvinces = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {

    try {

        const provinces =
            await provinceService.getAllProvinces();


        return res.status(200).json({

            success: true,

            count: provinces.length,

            data: provinces,

        });


    } catch (error) {

        next(error);

    }

};



// GET PROVINCE BY ID
export const getProvinceById = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {

    try {

        const id = Number(req.params.id);


        const province =
            await provinceService.getProvinceById(id);


        return res.status(200).json({

            success: true,

            data: province,

        });


    } catch (error) {

        next(error);

    }

};



// UPDATE PROVINCE
export const updateProvince = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {

    try {

        const id = Number(req.params.id);


        const province =
            await provinceService.updateProvince(
                id,
                req.body
            );


        return res.status(200).json({

            success: true,

            message: "Province updated successfully",

            data: province,

        });


    } catch (error) {

        next(error);

    }

};



// DELETE PROVINCE
export const deleteProvince = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {

    try {

        const id = Number(req.params.id);


        await provinceService.deleteProvince(id);


        return res.status(200).json({

            success: true,

            message: "Province deleted successfully",

        });


    } catch (error) {

        next(error);

    }

};