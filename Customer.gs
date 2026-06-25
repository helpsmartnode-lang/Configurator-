/******************************************************
 * CUSTOMER.GS
 ******************************************************/

const CUSTOMER_SHEET = "Customer";

function searchCustomer(mobile) {

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CUSTOMER_SHEET);

  if (!sheet) return null;

  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {

    if (String(data[i][0]) == String(mobile)) {

      return {
        mobile: data[i][0],
        city: data[i][1],
        bhk: data[i][2],
        package: data[i][3],
        amount: data[i][4]
      };

    }

  }

  return null;

}


function saveCustomer(customer){

  const ss=SpreadsheetApp.getActiveSpreadsheet();

  const sheet=ss.getSheetByName(CUSTOMER_SHEET);

  const data=sheet.getDataRange().getValues();

  for(let i=1;i<data.length;i++){

    if(String(data[i][0])==String(customer.mobile)){

      sheet.getRange(i+1,2).setValue(customer.city);
      sheet.getRange(i+1,3).setValue(customer.bhk);
      sheet.getRange(i+1,4).setValue(customer.package);
      sheet.getRange(i+1,5).setValue(customer.amount);

      return;

    }

  }

  sheet.appendRow([
    customer.mobile,
    customer.city,
    customer.bhk,
    customer.package,
    customer.amount
  ]);

}
