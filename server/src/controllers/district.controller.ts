import type { Request, Response, NextFunction } from "express";
import { districtService } from "../services/district.service.js";


// CREATE DISTRICT
export const createDistrict = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {

    try {

        const district =
            await districtService.createDistrict(req.body);


        return res.status(201).json({

            success: true,

            message: "District created successfully",

            data: district,

        });


    } catch (error) {

        next(error);

    }

};



// GET ALL DISTRICTS
export const getDistricts = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {

    try {

        const districts =
            await districtService.getAllDistricts();


        return res.status(200).json({

            success: true,

            count: districts.length,

            data: districts,

        });


    } catch (error) {

        next(error);

    }

};



// GET DISTRICT BY ID
export const getDistrictById = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {

    try {

        const id = Number(req.params.id);


        const district =
            await districtService.getDistrictById(id);



        return res.status(200).json({

            success: true,

            data: district,

        });


    } catch (error) {

        next(error);

    }

};



// UPDATE DISTRICT
export const updateDistrict = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {

    try {

        const id = Number(req.params.id);


        const district =
            await districtService.updateDistrict(
                id,
                req.body
            );


        return res.status(200).json({

            success: true,

            message: "District updated successfully",

            data: district,

        });


    } catch (error) {

        next(error);

    }

};



// DELETE DISTRICT
export const deleteDistrict = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {

    try {

        const id = Number(req.params.id);


        await districtService.deleteDistrict(id);


        return res.status(200).json({

            success: true,

            message: "District deleted successfully",

        });


    } catch (error) {

        next(error);

    }

};