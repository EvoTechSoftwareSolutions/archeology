import { useEffect, useState } from "react";
import { districtApi } from "../api/district.api";

export interface DistrictOption {
  id: number;
  name: string;
  province: string;
}

//or drop down and select district from the list of districts
export default function useDistrict() {

  const [districts, setDistricts] = useState<DistrictOption[]>([]);


  useEffect(() => {

    async function loadDistricts() {

      try {

        const response = await districtApi.getAll();

        const options = response.data.data.map(
          (district:any)=>({
            id: district.id,
            name: district.name,
            province: district.province?.name ?? ""
          })
        );


        setDistricts(options);


      } catch(error){

        console.error(error);

      }

    }


    loadDistricts();


  },[]);


  return {
    districts
  };

}