const PACKAGE_SHEET = "Package";

function getPackageAmounts(bhk){

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(PACKAGE_SHEET);

  const data = sheet.getDataRange().getValues();

  let result = {};

  for(let i=1;i<data.length;i++){

    if(data[i][0] == bhk){

      result[data[i][1]] = Number(data[i][2]);

    }

  }

  return result;

}
