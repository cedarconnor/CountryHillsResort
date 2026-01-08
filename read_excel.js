const XLSX = require('xlsx');
const workbook = XLSX.readFile('JosephineCounty_CompetitiveRoomInventory.xlsx');
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(sheet);
console.log(JSON.stringify(data, null, 2));
