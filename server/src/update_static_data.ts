import fs from "fs";
import path from "path";

const districtsPath = path.resolve("../client/src/data/districts.ts");
const provincesPath = path.resolve("../client/src/data/provinces.ts");

const districtIdMap: Record<string, number> = {
  "kandy": 1,
  "matale": 2,
  "nuwara eliya": 3,
  "ampara": 4,
  "batticaloa": 5,
  "trincomalee": 6,
  "anuradhapura": 7,
  "polonnaruwa": 8,
  "jaffna": 9,
  "kilinochchi": 10,
  "mannar": 11,
  "mullaitivu": 12,
  "vavuniya": 13,
  "kurunegala": 14,
  "puttalam": 15,
  "kegalle": 16,
  "ratnapura": 17,
  "galle": 18,
  "hambantota": 19,
  "matara": 20,
  "badulla": 21,
  "monaragala": 22,
  "colombo": 23,
  "gampaha": 24,
  "kalutara": 25
};

const provinceIdMap: Record<string, number> = {
  "central": 1,
  "eastern": 2,
  "north central": 3,
  "northern": 4,
  "north western": 5,
  "sabaragamuwa": 6,
  "southern": 7,
  "uva": 8,
  "western": 9
};

// 1. Update districts.ts
let districtsContent = fs.readFileSync(districtsPath, "utf-8");

// Parse objects in districts.ts array or replace IDs by matching district names
// Each item in districts.ts has:
// id: "X",
// name: "Name",
// province: "ProvinceName",

for (const [name, dbId] of Object.entries(districtIdMap)) {
  // Regex to find object block for district name
  const regex = new RegExp(`(id:\\s*"\\d+",\\s*name:\\s*"${name}")`, "i");
  const replacement = `id: "${dbId}",\n    name: "${name.charAt(0).toUpperCase() + name.slice(1)}"`;
  
  // Also handle names with spaces like "Nuwara Eliya" or "North Central"
  const formattedName = name.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const regexExact = new RegExp(`id:\\s*"\\d+",\\s*name:\\s*"${formattedName}"`, "g");
  districtsContent = districtsContent.replace(regexExact, `id: "${dbId}",\n    name: "${formattedName}"`);
}

fs.writeFileSync(districtsPath, districtsContent, "utf-8");
console.log("Updated client/src/data/districts.ts");

// 2. Update provinces.ts
let provincesContent = fs.readFileSync(provincesPath, "utf-8");

// Update province id fields
for (const [name, dbId] of Object.entries(provinceIdMap)) {
  const formattedName = name.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  
  // Province top level id
  const pRegex = new RegExp(`("id":\\s*\\d+,\\s*"name":\\s*"${formattedName}")`, "g");
  provincesContent = provincesContent.replace(pRegex, `"id": ${dbId},\n    "name": "${formattedName}"`);
}

// Update district id & provinceId inside provinces.ts
for (const [dName, dId] of Object.entries(districtIdMap)) {
  const formattedDName = dName.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const dRegex = new RegExp(`("id":\\s*\\d+,\\s*"name":\\s*"${formattedDName}")`, "g");
  provincesContent = provincesContent.replace(dRegex, `"id": ${dId},\n        "name": "${formattedDName}"`);
}

for (const [pName, pId] of Object.entries(provinceIdMap)) {
  const formattedPName = pName.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const pIdRegex = new RegExp(`("province":\\s*"${formattedPName}",\\s*"provinceId":\\s*)\\d+`, "g");
  provincesContent = provincesContent.replace(pIdRegex, `$1${pId}`);
}

fs.writeFileSync(provincesPath, provincesContent, "utf-8");
console.log("Updated client/src/data/provinces.ts");
