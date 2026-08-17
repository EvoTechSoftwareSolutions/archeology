import type { Request, Response, NextFunction } from "express";

import { historicalPlaceService } from "../services/historicalPlace.service.js";
import { getIO } from "../socket.js";
import { ApiError } from "../utils/ApiError.js";

const generateSlug = (name: string): string =>
  name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");

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
      galleryImages: (() => {
        let galleryMeta: { title?: string; description?: string }[] = [];
        if (req.body.galleryMetadataJson) {
          try {
            galleryMeta = JSON.parse(req.body.galleryMetadataJson);
          } catch (e) {}
        }
        return files?.galleryImages
          ? files.galleryImages.map((file, index) => ({
              url: `/uploads/${file.filename}`,
              title: galleryMeta[index]?.title || null,
              description: galleryMeta[index]?.description || null,
              position: index + 1,
            }))
          : [];
      })(),

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
      slug: req.body.slug || generateSlug(req.body.name),
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
      statusFlag: req.query.statusFlag
        ? String(req.query.statusFlag)
        : undefined,
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

// GET ALL ACTIVE HISTORICAL PLACES
export const getActiveHistoricalPlaces = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const parseNum = (v: unknown) => {
      if (v === undefined || v === null || v === "") {
        return undefined;
      }

      const n = Number(v);

      return isNaN(n) ? undefined : n;
    };

    const places = await historicalPlaceService.getActivePlaces({
      search: req.query.search
        ? String(req.query.search)
        : undefined,

      districtId: parseNum(req.query.districtId),

      provinceId: parseNum(req.query.provinceId),

      category: req.query.category
        ? String(req.query.category)
        : undefined,

      statusFlag: req.query.statusFlag
        ? String(req.query.statusFlag)
        : undefined,
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
    const idParam = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;
    const place = await historicalPlaceService.getPlaceById(idParam);

    return res.status(200).json({
      success: true,
      data: place,
    });
  } catch (error) {
    next(error);
  }
};


export const getNearbyHistoricalPlaces = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const currentPlaceId = Number(req.params.id);
    const districtId = Number(req.query.districtId);
    const anchorXPct = Number(req.query.anchorXPct);
    const anchorYPct = Number(req.query.anchorYPct);

    // Validate historical place ID
    if (!Number.isInteger(currentPlaceId) || currentPlaceId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid historical place ID",
      });
    }

    // Validate district ID
    if (!Number.isInteger(districtId) || districtId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid districtId is required",
      });
    }

    // Validate anchor coordinates
    if (!Number.isFinite(anchorXPct) || !Number.isFinite(anchorYPct)) {
      return res.status(400).json({
        success: false,
        message: "Valid anchorXPct and anchorYPct are required",
      });
    }

    const nearbyPlaces =
      await historicalPlaceService.getNearbyPlaces(
        currentPlaceId,
        districtId,
        anchorXPct,
        anchorYPct,
      );

    return res.status(200).json({
      success: true,
      count: nearbyPlaces.length,
      data: nearbyPlaces,
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

      // Gallery images parsing for update
      galleryImages: (() => {
        let existingGallery: any[] = [];
        if (req.body.existingGalleryImages) {
          try {
            const parsed = JSON.parse(req.body.existingGalleryImages);
            if (Array.isArray(parsed)) {
              existingGallery = parsed.map((item: any, idx: number) => {
                if (typeof item === "string") {
                  return { url: item, position: idx + 1 };
                }
                return {
                  url: item.url,
                  title: item.title || null,
                  description: item.description || null,
                  position: item.position ?? idx + 1,
                };
              });
            }
          } catch (e) {}
        }

        let existingGalleryMeta: { title?: string; description?: string }[] =
          [];
        if (req.body.existingGalleryMetadataJson) {
          try {
            existingGalleryMeta = JSON.parse(
              req.body.existingGalleryMetadataJson,
            );
            existingGallery = existingGallery.map((item, idx) => ({
              ...item,
              title: existingGalleryMeta[idx]?.title ?? item.title ?? null,
              description:
                existingGalleryMeta[idx]?.description ??
                item.description ??
                null,
            }));
          } catch (e) {}
        }

        let newGalleryMeta: { title?: string; description?: string }[] = [];
        if (req.body.galleryMetadataJson) {
          try {
            newGalleryMeta = JSON.parse(req.body.galleryMetadataJson);
          } catch (e) {}
        }

        const newGalleryImages = files?.galleryImages
          ? files.galleryImages.map((file, index) => ({
              url: `/uploads/${file.filename}`,
              title: newGalleryMeta[index]?.title || null,
              description: newGalleryMeta[index]?.description || null,
              position: existingGallery.length + index + 1,
            }))
          : [];

        return [...existingGallery, ...newGalleryImages];
      })(),
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

// TOGGLE HISTORICAL PLACE ACTIVE STATUS
export const toggleHistoricalPlaceActive = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid historical place ID",
      });
    }

    const place = await historicalPlaceService.togglePlaceActive(id);

    return res.status(200).json({
      success: true,
      message: place.isActive
        ? "Historical place activated successfully"
        : "Historical place deactivated successfully",
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
