import type { Request, Response, NextFunction } from "express";

import { historicalPlaceService } from "../services/historicalPlace.service.js";
import { getIO } from "../socket.js";

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

      // Dynamic Place Details
      timelineJson: req.body.timelineJson || null,
      crowd: req.body.crowd || null,
      distance: req.body.distance || null,
      drivingTime: req.body.drivingTime || null,
      walkingTime: req.body.walkingTime || null,
      recommendedDeparture: req.body.recommendedDeparture || null,
      weather: req.body.weather || null,
      temperature: req.body.temperature || null,
      photographyTime: req.body.photographyTime || null,
      nearbyFuel: req.body.nearbyFuel || null,
      nearbyWashrooms: req.body.nearbyWashrooms || null,
      nearbyBusStops: req.body.nearbyBusStops || null,
      nearbyParking: req.body.nearbyParking || null,
      nearbyRailway: req.body.nearbyRailway || null,
      emergencyPolice: req.body.emergencyPolice || null,
      emergencyAmbulance: req.body.emergencyAmbulance || null,
      openingHours: req.body.openingHours || null,
      earlyMorningSlot: req.body.earlyMorningSlot || null,
      midDaySlot: req.body.midDaySlot || null,
      lateAfternoonSlot: req.body.lateAfternoonSlot || null,
      visitNote: req.body.visitNote || null,
      contactAddress: req.body.contactAddress || null,
      contactAdminPhone: req.body.contactAdminPhone || null,
      contactEmergencyPhone: req.body.contactEmergencyPhone || null,
      contactWebsite: req.body.contactWebsite || null,
      contactEmail: req.body.contactEmail || null,
      dressCode: req.body.dressCode || null,
      photographyRules: req.body.photographyRules || null,
      accessibility: req.body.accessibility || null,
      dosJson: req.body.dosJson || null,
      dontsJson: req.body.dontsJson || null,

      // SEO
      seoTitle: req.body.seoTitle || null,
      metaDescription: req.body.metaDescription || null,
      slug: req.body.slug || null,
      focusKeywords: req.body.focusKeywords || null,
    };

    const place = await historicalPlaceService.createPlace(placeData);

    // Emit a real-time notification to admins when a new place is added
    try {
      const io = getIO();
      io.to("role:ADMIN").emit("notification:new", {
        id: place.id,
        title: "New place added",
        subtitle: place.name,
        createdAt: place.createdAt,
      });
    } catch (err) {
      // socket not initialized or error - ignore
      console.warn("Socket emit failed", err);
    }

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
    const parseNum = (v: unknown) => {
      if (v === undefined || v === null || v === "") return undefined;
      const n = Number(v);
      return isNaN(n) ? undefined : n;
    };

    const places = await historicalPlaceService.getAllPlaces({
      search: req.query.search ? String(req.query.search) : undefined,
      districtId: parseNum(req.query.districtId),
      provinceId: parseNum(req.query.provinceId),
      category: req.query.category ? String(req.query.category) : undefined,
      statusFlag: req.query.statusFlag ? String(req.query.statusFlag) : undefined,
    });

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
    const idParam = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const place = await historicalPlaceService.getPlaceById(idParam);

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

    const files = req.files as {
      image?: Express.Multer.File[];
      galleryImages?: Express.Multer.File[];
    };

    const updateData = {
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      century: req.body.century,
      statusFlag: req.body.statusFlag,

      latitude: Number(req.body.latitude),
      longitude: Number(req.body.longitude),

      anchorXPct: Number(req.body.anchorXPct),
      anchorYPct: Number(req.body.anchorYPct),

      provinceId: Number(req.body.provinceId),
      districtId: Number(req.body.districtId),

      nearbyHotels: req.body.nearbyHotels || null,
      nearbyHospitals: req.body.nearbyHospitals || null,
      nearbyRestaurant: req.body.nearbyRestaurant || null,
      travelTips: req.body.travelTips || null,

      // Dynamic Place Details
      timelineJson: req.body.timelineJson || null,
      crowd: req.body.crowd || null,
      distance: req.body.distance || null,
      drivingTime: req.body.drivingTime || null,
      walkingTime: req.body.walkingTime || null,
      recommendedDeparture: req.body.recommendedDeparture || null,
      weather: req.body.weather || null,
      temperature: req.body.temperature || null,
      photographyTime: req.body.photographyTime || null,
      nearbyFuel: req.body.nearbyFuel || null,
      nearbyWashrooms: req.body.nearbyWashrooms || null,
      nearbyBusStops: req.body.nearbyBusStops || null,
      nearbyParking: req.body.nearbyParking || null,
      nearbyRailway: req.body.nearbyRailway || null,
      emergencyPolice: req.body.emergencyPolice || null,
      emergencyAmbulance: req.body.emergencyAmbulance || null,
      openingHours: req.body.openingHours || null,
      earlyMorningSlot: req.body.earlyMorningSlot || null,
      midDaySlot: req.body.midDaySlot || null,
      lateAfternoonSlot: req.body.lateAfternoonSlot || null,
      visitNote: req.body.visitNote || null,
      contactAddress: req.body.contactAddress || null,
      contactAdminPhone: req.body.contactAdminPhone || null,
      contactEmergencyPhone: req.body.contactEmergencyPhone || null,
      contactWebsite: req.body.contactWebsite || null,
      contactEmail: req.body.contactEmail || null,
      dressCode: req.body.dressCode || null,
      photographyRules: req.body.photographyRules || null,
      accessibility: req.body.accessibility || null,
      dosJson: req.body.dosJson || null,
      dontsJson: req.body.dontsJson || null,

      seoTitle: req.body.seoTitle || null,
      metaDescription: req.body.metaDescription || null,
      slug: req.body.slug || null,
      focusKeywords: req.body.focusKeywords || null,

      image: files?.image?.length
        ? `/uploads/${files.image[0].filename}`
        : undefined,
    };

    console.log("UPDATE DATA:", updateData);

    const place = await historicalPlaceService.updatePlace(id, updateData);

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
