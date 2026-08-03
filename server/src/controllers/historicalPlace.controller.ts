import type { Request, Response, NextFunction } from "express";

import { historicalPlaceService } from "../services/historicalPlace.service.js";

// CREATE HISTORICAL PLACE
export const createHistoricalPlace = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
 const files = req.files as {
  image?: Express.Multer.File[];
  galleryImages?: Express.Multer.File[];
};

    const placeData = {
      // Text fields from FormData
      name: req.body.name,

      category: req.body.category,

      description: req.body.description,

      century: req.body.century,

      statusFlag: req.body.statusFlag,

      // Convert numbers
      latitude: Number(req.body.latitude),

      longitude: Number(req.body.longitude),

      anchorXPct: Number(req.body.anchorXPct),

      anchorYPct: Number(req.body.anchorYPct),

      districtId: Number(req.body.districtId),

      provinceId: Number(req.body.provinceId),

      // Hero image
      image: files?.image?.length
        ? `/uploads/${files.image[0].filename}`
        : null,

      // Gallery images
      galleryImages: files?.galleryImages
        ? files.galleryImages.map((file, index) => ({
            url: `/uploads/${file.filename}`,
            position: index + 1,
          }))
        : [],

      // Facilities
      nearbyHotels: req.body.nearbyHotels || null,

      nearbyHospitals: req.body.nearbyHospitals || null,

      nearbyRestaurant: req.body.nearbyRestaurant || null,

      travelTips: req.body.travelTips || null,

      // SEO
      seoTitle: req.body.seoTitle || null,

      metaDescription: req.body.metaDescription || null,

      slug: req.body.slug || null,

      focusKeywords: req.body.focusKeywords || null,
    };

    const place = await historicalPlaceService.createPlace(placeData);

    return res.status(201).json({
      success: true,

      message: "Historical place created successfully",

      data: place,
    });
  } catch (error) {
    next(error);
  }
};

// GET ALL HISTORICAL PLACES
export const getHistoricalPlaces = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const places = await historicalPlaceService.getAllPlaces();

    return res.status(200).json({
      success: true,

      count: places.length,

      data: places,
    });
  } catch (error) {
    next(error);
  }
};

// GET HISTORICAL PLACE BY ID
export const getHistoricalPlaceById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);

    const place = await historicalPlaceService.getPlaceById(id);

    return res.status(200).json({
      success: true,

      data: place,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE HISTORICAL PLACE
export const updateHistoricalPlace = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);

    const place = await historicalPlaceService.updatePlace(id, req.body);

    return res.status(200).json({
      success: true,

      message: "Historical place updated successfully",

      data: place,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE HISTORICAL PLACE
export const deleteHistoricalPlace = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);

    await historicalPlaceService.deletePlace(id);

    return res.status(200).json({
      success: true,

      message: "Historical place deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
