export interface DashboardStats {

  historicalPlaces:number;

  subscribers:number;

  messages:number;

  visitors:number;

}


export interface DashboardResponse {

  success:boolean;

  data:DashboardStats;

}