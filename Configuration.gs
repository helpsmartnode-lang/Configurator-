/******************************************************
 * CONFIGURATION.GS
 ******************************************************/

const CONFIG_SHEET = "Configuration";

/**
 * Save Complete Configuration
 */
function saveConfiguration(customer, rooms) {

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(CONFIG_SHEET);

  if (!sheet) {
    sheet = ss.insertSheet(CONFIG_SHEET);

    sheet.appendRow([
      "Mobile",
      "City",
      "BHK",
      "Package",
      "Room",
      "Room Selected",
      "Device",
      "Device Selected",
      "Amount"
    ]);
  }

  // Remove previous configuration for same customer
  const data = sheet.getDataRange().getValues();

  for (let i = data.length; i >= 2; i--) {

    if (String(data[i - 1][0]) == String(customer.mobile)) {
      sheet.deleteRow(i);
    }

  }

  // Save Customer Master
  saveCustomer(customer);

  // Save Configuration
  rooms.forEach(room => {

    room.devices.forEach(device => {

      sheet.appendRow([
        customer.mobile,
        customer.city,
        customer.bhk,
        customer.package,
        room.room,
        room.selected,
        device.name,
        device.selected,
        device.amount || 0
      ]);

    });

  });

  return true;

}


/**
 * Load Existing Configuration
 */

function getConfiguration(mobile){

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const sheet = ss.getSheetByName(CONFIG_SHEET);

  if(!sheet) return [];

  const data = sheet.getDataRange().getValues();

  let rooms = {};

  for(let i=1;i<data.length;i++){

    if(String(data[i][0]) != String(mobile))
      continue;

    let room = data[i][4];

    if(!rooms[room]){

      rooms[room]={
        room:room,
        selected:data[i][5],
        devices:[]
      };

    }

    rooms[room].devices.push({

      name:data[i][6],

      selected:data[i][7],

      amount:Number(data[i][8])

    });

  }

  return Object.values(rooms);

}


/**
 * Delete Existing Configuration
 */

function deleteConfiguration(mobile){

  const ss=SpreadsheetApp.getActiveSpreadsheet();

  const sheet=ss.getSheetByName(CONFIG_SHEET);

  if(!sheet) return;

  const data=sheet.getDataRange().getValues();

  for(let i=data.length;i>=2;i--){

    if(String(data[i-1][0])==String(mobile)){

      sheet.deleteRow(i);

    }

  }

}
