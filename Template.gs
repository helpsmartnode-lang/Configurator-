/******************************************************
 * TEMPLATE.GS
 ******************************************************/

const TEMPLATE_SHEET = "Template";

/**
 * Load Template Based on
 * BHK + Package
 */
function loadTemplate(bhk, packageName) {

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(TEMPLATE_SHEET);

  if (!sheet) {
    throw new Error("Template sheet not found.");
  }

  const data = sheet.getDataRange().getValues();

  let rooms = {};

  // Skip Header
  for (let i = 1; i < data.length; i++) {

    const rowBHK = data[i][0];
    const rowPackage = data[i][1];

    if (rowBHK != bhk || rowPackage != packageName)
      continue;

    const room = data[i][2];
    const device = data[i][3];
    const amount = Number(data[i][4]);
    const selected = String(data[i][5]).toUpperCase() == "TRUE";

    if (!rooms[room]) {

      rooms[room] = {
        room: room,
        selected: true,
        devices: []
      };

    }

    rooms[room].devices.push({
      name: device,
      amount: amount,
      selected: selected
    });

  }

  return Object.values(rooms);

}


/**
 * Return Package Amount
 */

function getPackageAmount(bhk, packageName){

  const rooms = loadTemplate(bhk, packageName);

  let total = 0;

  rooms.forEach(room=>{

    room.devices.forEach(device=>{

      if(device.selected){

        total += device.amount;

      }

    });

  });

  return total;

}
