import fs from "fs";
import path from "path";

const districtsPath = path.resolve("../client/src/data/districts.ts");
const provincesPath = path.resolve("../client/src/data/provinces.ts");

const districtIdMap: Record<string, number> = {
  "jaffna": 1,
  "kilinochchi": 2,
  "mannar": 3,
  "mullaitivu": 4,
  "vavuniya": 5,
  "ampara": 6,
  "batticaloa": 7,
  "trincomalee": 8,
  "anuradhapura": 9,
  "polonnaruwa": 10,
  "kurunegala": 11,
  "puttalam": 12,
  "kandy": 13,
  "matale": 14,
  "nuwara eliya": 15,
  "badulla": 16,
  "monaragala": 17,
  "kegalle": 18,
  "ratnapura": 19,
  "colombo": 20,
  "gampaha": 21,
  "kalutara": 22,
  "galle": 23,
  "hambantota": 24,
  "matara": 25
};

const provinceIdMap: Record<string, number> = {
  "northern": 1,
  "eastern": 2,
  "north central": 3,
  "north western": 4,
  "central": 5,
  "uva": 6,
  "sabaragamuwa": 7,
  "western": 8,
  "southern": 9
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
