/**
 * STOPGAP ONLY. Maps our SVG-derived district codes to your database's
 * numeric District.id, until you add a `code` column (e.g. "LK41") to
 * the District table and query by that instead — the more robust
 * long-term fix, since it removes the need to hand-maintain this file.
 *
 * All 25 codes are scaffolded below with their English name as a comment
 * so you can just fill in the number from your admin panel's district
 * list. Two are already confirmed from what you've shown me.
 */
export const districtApiIds: Record<string, number> = {
  LK53: 3, // Trincomalee — confirmed
  LK45: 4, // Mullaitivu — TODO: replace 0 with the real id
  LK41: 1, // Jaffna — TODO: replace 0 with the real id
  LK42: 2, // Kilinochchi — TODO: replace 0 with the real id
  LK43: 5, // Mannar — TODO: replace 0 with the real id
  LK62: 6, // Puttalam — TODO: replace 0 with the real id
  LK12: 7, // Gampaha — TODO: replace 0 with the real id
  LK11: 8, // Colombo — TODO: replace 0 with the real id
  LK13: 9, // Kalutara — TODO: replace 0 with the real id
  LK31: 10, // Galle — TODO: replace 0 with the real id
  LK32: 11, // Matara — TODO: replace 0 with the real id
  LK33: 12, // Hambantota — TODO: replace 0 with the real id
  LK52: 13, // Ampara — TODO: replace 0 with the real id
  LK51: 14, // Batticaloa — TODO: replace 0 with the real id
  LK91: 15, // Ratnapura — TODO: replace 0 with the real id
  LK82: 16, // Monaragala — TODO: replace 0 with the real id
  LK92: 17, // Kegalle — TODO: replace 0 with the real id
  LK81: 18, // Badulla — TODO: replace 0 with the real id
  LK22: 19, // Matale — TODO: replace 0 with the real id
  LK72: 20, // Polonnaruwa — TODO: replace 0 with the real id
  LK61: 21, // Kurunegala — TODO: replace 0 with the real id
  LK71: 22, // Anuradhapura — TODO: replace 0 with the real id
  LK23: 23, // Nuwara Eliya — TODO: replace 0 with the real id
  LK44: 24, // Vavuniya — confirmed
  LK21: 25, // Kandy — TODO: replace 0 with the real id
};