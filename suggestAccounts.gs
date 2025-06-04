

// Constants
const SUPER_MAP_SHEET_NAME = "WTG_All the Accounts"; // Easily change the sheet name here
const CLIENT_SHEET_NAME = "Create Client";
const CLIENT_START_ROW = 12;
const CLIENT_END_ROW = 16;
const CLIENT_START_COLUMN = 1; // Column A
//const CLIENT_NAME_CELL = "B1"; // Assuming client name is in cell B1 on "Create Client" sheet





function getSuggestedAccounts() {
  const searchTerm = getSheetClientName();
  const numResults = 5;

  const suggestedAccounts = suggestAccounts(searchTerm, numResults);

  if (suggestedAccounts.length === 0) {
    return;
  }

  const clientSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CLIENT_SHEET_NAME);
  clientSheet.getRange(clientNameA1).setValue(searchTerm);
  const tempTargetRange = clientSheet.getRange(CLIENT_START_ROW, CLIENT_START_COLUMN, CLIENT_END_ROW-CLIENT_START_ROW, 4);

  // Extract the first 3 columns from each row
  const dataToWrite = suggestedAccounts.map(row => row.slice(0, 3));

  const targetRange = clientSheet.getRange(CLIENT_START_ROW, CLIENT_START_COLUMN, dataToWrite.length, 3);

  tempTargetRange.clearContent();

  targetRange.setValues(dataToWrite); 
}






function suggestAccounts(query, resultNumber) {
  // Input validation (same as before)
  query = query.toLowerCase();
  resultNumber = Math.min(resultNumber, 5);

  // Get the active spreadsheet and the "Super Map" sheet
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const superMapSheet = spreadsheet.getSheetByName(SUPER_MAP_SHEET_NAME);

  // Get all the values from the "Super Map" sheet
  const superMapData = superMapSheet.getDataRange().getValues();


  // Filter and match folders (return all 3 columns)
  const matchingFolders = superMapData.filter(row => {
    const folderName = String(row[0]).toLowerCase(); // Convert to string before calling toLowerCase()
    return folderName.includes(query);
  }).slice(0, resultNumber);

  // Prepare and log results to console
  console.log(matchingFolders); // Output the full array of folder details to the console for testing

  return matchingFolders;
}
