export interface AnalyticsStats {
  historicalPlaces: number;
  unescoSites: number;
  images: number;
  monthlyVisitors: number;
}

export interface VisitorAnalytics {
  months: string[];
  locals: number[];
  foreigners: number[];
}

export interface ProvinceDistribution {
  province: string;
  locals: number;
  foreigners: number;
}

export interface MostSearched {
  name: string;
  count: number;
}

export interface AnalyticsData {
  stats: AnalyticsStats;
  visitorAnalytics: VisitorAnalytics;
  provinceDistribution: ProvinceDistribution[];
  mostSearched: MostSearched[];
}