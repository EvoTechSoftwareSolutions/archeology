import { historicalPlaceService } from "../services/historicalPlace.service.js";
// CREATE HISTORICAL PLACE
export const createHistoricalPlace = async (req, res, next) => {
    try {
        const place = await historicalPlaceService.createPlace(req.body);
        return res.status(201).json({
            success: true,
            message: "Historical place created successfully",
            data: place,
        });
    }
    catch (error) {
        next(error);
    }
};
// GET ALL HISTORICAL PLACES
export const getHistoricalPlaces = async (req, res, next) => {
    try {
        const { district } = req.query;
        let places;
        if (district) {
            places = await historicalPlaceService.getPlacesByDistrictName(district);
        }
        else {
            places = await historicalPlaceService.getAllPlaces();
        }
        return res.status(200).json({
            success: true,
            count: places.length,
            data: places,
        });
    }
    catch (error) {
        next(error);
    }
};
// GET HISTORICAL PLACE BY ID
export const getHistoricalPlaceById = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const place = await historicalPlaceService.getPlaceById(id);
        return res.status(200).json({
            success: true,
            data: place,
        });
    }
    catch (error) {
        next(error);
    }
};
// UPDATE HISTORICAL PLACE
export const updateHistoricalPlace = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const place = await historicalPlaceService.updatePlace(id, req.body);
        return res.status(200).json({
            success: true,
            message: "Historical place updated successfully",
            data: place,
        });
    }
    catch (error) {
        next(error);
    }
};
// DELETE HISTORICAL PLACE
export const deleteHistoricalPlace = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        await historicalPlaceService.deletePlace(id);
        return res.status(200).json({
            success: true,
            message: "Historical place deleted successfully",
        });
    }
    catch (error) {
        next(error);
    }
};
