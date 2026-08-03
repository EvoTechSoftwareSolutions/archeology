export interface HistoricalPlace {

  id?:number;

  name:string;

  image:string;

  description:string;

  latitude?:number;

  longitude?:number;

  anchorXPct:number;

  anchorYPct:number;

}



export interface Bbox {

x:number;

y:number;

width:number;

height:number;

}



export interface District {

id:string;

dbId?:number;

name:string;

localName:string;

province:string;

color:string;

path:string;

bbox:Bbox;

labelX:number;

labelY:number;

historicalPlaces:HistoricalPlace[];

}