import { historicalPlaceApi } from "../api/historicalPlace.api";
import { districts } from "../data/districts";

export async function getMapDistricts() {
  const districtShapes = [...districts];

  const res = await historicalPlaceApi.getAll();
  const payload = res.data?.data;
  const places = Array.isArray(payload) ? payload : payload?.items ?? [];

  const normalizeAnchor = (val: number) => (val > 1 ? val / 100 : val);

  for (const district of districtShapes) {
    district.historicalPlaces = places
      .filter(
        (p: any) =>
          (p.district?.name ?? "").toLowerCase() === district.name.toLowerCase()
      )
      .map((p: any) => ({
        id: p.id,
        name: p.name,
        image: p.image,
        description: p.description,
        anchorXPct: normalizeAnchor(p.anchorXPct),
        anchorYPct: normalizeAnchor(p.anchorYPct),
      }));
  }


  return districtShapes;
}